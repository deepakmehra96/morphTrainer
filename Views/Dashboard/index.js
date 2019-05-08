import React from 'react'
import { Text, View, AsyncStorage, StyleSheet, Dimensions, Image, Slider, TouchableOpacity, ImageBackground, BackHandler, TextInput, TouchableHighlight, FlatList, ListView, ScrollView, PixelRatio } from 'react-native';
import { Container, Content, SwipeRow, Button, List, ListItem, Icon } from 'native-base';
import { connect } from 'react-redux';
import ProgressCircle from 'react-native-progress-circle'
import GradientBtn from '../../components/LinearGradient';
import DialogBox from '../../components/Common/DialogBox';
import Dialog, { SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import { getGoalList, addUserGoal, openToast, setGoalVisible, getUserDetails, getDashboardData, setDashData, setMomentDate, getCustomerList, changeStatus, deleteGoal } from '../../redux/actions';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import ShowLoader from '../../components/ShowLoader';
import {InputAutoSuggest} from '../../components/Common/react-native-autocomplete-search';
import moment from 'moment';
import Icons from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient';
const row = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
var { height, width } = Dimensions.get('window');

class Dashboard extends React.Component {
    static navigationOptions = {
        header: null
    }
    constructor(props) {
        super(props)
        this.state = {
            checked: true,
            isChecked: false,
            bloodGlucoseVisible: false,
            goalDropdown: false,
            addCustom: false,
            showLoader: false,
            data: [{ key: 'a' }, { key: 'b' }],
            date: moment(),
            goalLoader: false,
            setGoal: '',
            selectedColor: '',
            hideList: false,
            exercise_list: row,
            tasks_list: row,
            bp_list: row,
            bg_list: row,
            meal_list: {
                Breakfast: row,
                Lunch: row,
                Dinner: row,
                Snacks: row
            },
            dbLoader: false,
            goalDialog: false,
            goalColorData: [
                {
                    color: 'red',
                    id: 1
                },
                {
                    color: 'blue',
                    id: 2
                },
                {
                    color: 'green',
                    id: 2
                },
                
            ],
            goalColor: 'red'
        }
      }

    componentDidMount(){
        let { date } = this.props.userData
        this.setState({ showLoader: true })
        console.log(this.props,"this.props")
        this.getDashboardApi(date)
        this.props.dispatch(getGoalList()).then(res => {
            this.setState({ showLoader: false })
            console.log(res,"response1234677")
        }).catch(err => {
            this.setState({ showLoader: false })
            console.log(err,"err")
        })
    }

    componentWillReceiveProps(nextProps){
        let { date } = nextProps.userData
        let prevProp = JSON.stringify(this.props.userData && this.props.userData.dashboardData)
        let nextProp = JSON.stringify(nextProps.userData && nextProps.userData.dashboardData)
        if(prevProp !== nextProp && (nextProps.userData && nextProps.userData.setDashboardData)){
            this.props.dispatch(setDashData(false))
            console.log(date,"daterecieve")
            this.getDashboardApi(date)
        }
    }


    getDashboardApi(date){
        let {user_id} = this.props.navigation.state && this.props.navigation.state.params
        console.log(this.props.navigation,user_id,"jhgcf")
        this.setState({ dbLoader: true })
        let data = {
            user_id: user_id,
            date: date
        }
        this.props.dispatch(getDashboardData(data)).then(res => {
            console.log(res,"res0987")
            this.renderData(res.data)
            this.renderFoodItem('Breakfast')
            this.renderFoodItem('Lunch')
            this.renderFoodItem('Dinner')
            this.renderFoodItem('Snacks')
            this.setState({ dbLoader: false})
        }).catch(err => {
            console.log(err,"err0987")
            this.setState({ dbLoader: false })
        })
    }

    handelLoader() {
        let { showLoader, goalLoader, dbLoader } = this.state
        if (showLoader || goalLoader || dbLoader) {
            return <ShowLoader />
        } else {
            return null
        }
        return
    }
    
    showCheck(val) {
        let { checked } = this.state
        if (!val) {
            return (
                <View style={styles.checkboxOut}>
                    <Image style={styles.imageMain} source={require('../../assets/images/checking.png')} />
                </View>
            )
        } else {
            return (
                <View style={styles.checkboxOut}>
                    {/* <Image style={styles.imageMain} source={require('../../assets/images/unchecked.png')} /> */}
                </View>
            )
        }
    }
    showChecked(item) {
        if (item) {
            return (
                <View style={styles.checkboxOut}>
                    <Image style={styles.imageMain} source={require('../../assets/images/checking.png')} />
                </View>
            )
        } else {
            return (
                <View style={styles.checkboxOut}>
                    {/* <Image style={styles.imageMain} source={require('../../assets/images/dashboard-meal-tab-icons_41.png')} /> */}
                </View>
            )
        }
    }
    openGoalModal = (visible) => {
        this.props.dispatch(setGoalVisible(visible))
    }
    

    onRemoveFoodItem(data,secId, rowId, rowMap){
        let apidata = {
            foodItemId: data._id
        }
        let { date } = this.props.userData
        this.setState({ showLoader: true })
        this.props.dispatch(removeFoodItem(apidata)).then(res => {
            this.props.dispatch(openToast(res.data.message))
            if(res.data.message === 'Food item deleted successfully'){
                rowMap[`${secId}${rowId}`].props.closeRow()
                this.setState({ showLoader: false })
                this.getDashboardApi(date)
            }
        }).catch(err => {
            this.setState({ showLoader: false })
            this.props.dispatch(openToast(err.data.message))
        })
    }
    onAddUserGoal = () => {
        let { setGoal, goalColor} = this.state
        let { date } = this.props.userData
        let {user_id} = this.props.navigation.state && this.props.navigation.state.params
        let data = {
            goal: setGoal,
            color: goalColor,
            user_id: user_id,
            date: date
        }
        if(setGoal){
            this.setState({ goalLoader: true })
            this.props.dispatch(addUserGoal(data)).then(res => {
                console.log(res,"resgoal")
                this.setState({ setGoal: '', goalColor: 'red' })
                this.props.dispatch(setGoalVisible(false))
                this.setState({ goalLoader: false })
                if(res.data.message){
                    this.props.dispatch(openToast(res.data.message))
                }
                if(res.data.message === 'Goal added successfully'){
                    this.setState({ setGoal: '', goalColor: 'red' })
                    this.getDashboardApi(date)
                    this.props.navigation.navigate('Dashboard')
                }
            }).catch(err => {
                console.log(err,"errgoal")
                this.setState({ goalLoader: false })
                if(err.message){
                    this.props.dispatch(openToast(err.message))
                }
            })
        }else{
            this.props.dispatch(openToast('Please add goal'))
        }
    }
    ChangeGoal = (e) => {
        this.setState({ setGoal: e, hideList: false })
    }
    onDataSelectedChange(data){
        if(data && data.name){
            this.setState({ setGoal: data.name })
        }
    }

    goalContent = () => {
        let { hideList, goalColor } = this.state;
        let { goalList } = this.props.userData
        let data = [{
            value: 'Banana',
          }, {
            value: 'Mango',
          }, {
            value: 'Pear',
          }];
        return (
            <View style={{padding: 20,paddingBottom: 0,height: '100%'}}>
                {/* <View style={[styles.alignRowGoals,{marginTop: 0,flexDirection: 'column'}]}> */}
                    {/* <View style={{height: 30,justifyContent: 'center',alignItems: 'center',borderBottomWidth: 1,borderColor: '#f3f3f3',width: '100%'}}><Text style={{textAlign: 'center',fontSize: 15,color: '#000'}}>Your goal</Text></View> */}
                        
                            <View style={{padding: 0,zIndex: 10000,paddingRight: 70}}>
                                {/* <TouchableOpacity style={{height: 40,alignItems: 'center',justifyContent: 'center',width: '100%',borderRadius: 3,borderWidth: 1,borderColor: '#efefef'}} onPress={this.openDropdown}>
                                    <Text style={{color: '#f3996f',fontSize: 10,fontWeight: 'bold'}}>{this.props.userData.goal || 'No Data Added'}</Text>
                                </TouchableOpacity> */}
                                <InputAutoSuggest
                                    style={{ minHeight: 200,backgroundColor: 'red' }}
                                    inputStyle={{ height: 40,borderRadius: 5,borderWidth: 1, borderColor: '#aba6a6',paddingLeft: 10,paddingRight: 10}}
                                    flatListStyle={{position: 'absolute',top: 45,left: 0,width: '100%',zIndex: 10000, backgroundColor: '#fff',maxHeight: 120}}
                                    itemTextStyle={{fontSize: 14,padding: 10}}
                                    staticData={goalList}
                                    onDataSelectedChange={data => this.onDataSelectedChange(data)}
                                    onChange={(data) => this.ChangeGoal(data)}
                                    onItemPress={() => this.setState({ hideList: true })}
                                    hide={hideList} 
                                    setGoal={this.state.setGoal}
                                />
                            </View>
                            <View style={{position: 'absolute',right: 20, top: 20,zIndex: 100000000}}>
                                <TouchableOpacity style={{height: 40,borderRadius: 5,borderWidth: 1, borderColor: '#aba6a6',paddingLeft: 10,paddingRight: 10, alignItems: 'center',flexDirection: 'row',zIndex: 100000}} onPress={() => this.setState({ goalDialog: true })} activeOpacity={0.7}>
                                    <View style={{width: 15,height: 15,borderRadius: 10, backgroundColor: goalColor,marginRight: 15}}></View>
                                    <Icons name="down" size={15} color="#aba6a6"/>
                                </TouchableOpacity>
                            </View>
                        
                        
                        {/* <RadioGroup
                            size={24}
                            thickness={2}
                            color='#ef6937'
                            highlightColor='#fff'
                            onSelect = {(index, value) => this.onSelect(index, value)}
                            activeColor={this.state.selectedColor}
                            >
                                <RadioButton value={'normal'} style={{backgroundColor: '#fff'}} >
                                    <Text style={{color: 'blue'}}>Normal</Text>
                                </RadioButton>
                                <RadioButton value={'medium'} style={{backgroundColor: '#fff'}} >
                                    <Text style={{color: 'yellow'}}>Medium</Text>
                                </RadioButton>
                                <RadioButton value={'high'} style={{backgroundColor: '#fff'}}>
                                    <Text style={{color: 'red'}}>High</Text>
                                </RadioButton>
                        </RadioGroup> */}
                        <TouchableOpacity style={{position: 'absolute',bottom: 20,width: '100%',left: 20}} onPress={this.onAddUserGoal}>
                            <GradientBtn text={'ADD GOAL'} style={[styles.buttonShadow,{height: 35,overflow: 'hidden'}]} btnStyle={{fontSize: 16}}/>
                        </TouchableOpacity>
                    {/* </View> */}
                </View>
            )
        }

    onSelect(index, value){
        if(value === 'normal'){
            this.setState({ selectedColor: 'blue'})
        }
        if(value === 'medium'){
            this.setState({ selectedColor: 'yellow'})
        }
        if(value === 'high'){
            this.setState({ selectedColor: 'red'})
        }
      }

    mealDate(date){
        if(date){
            date = date + '000'
            date = parseInt(date)
            if(moment(date).format('LL') === moment().format('LL')){
                return 'TODAY, '+ moment(date).format('LT')
            }else{
                return moment(date).format('LLL')
            }
        }
    }

    onChangeDate  = (item) => {
        let { date } = this.state;
        if(item === 'previous'){
            let preVDay = date.subtract(1, 'days')
            let formattedDate = moment(preVDay).format('YYYY-MM-DD')
            this.getDashboardApi(formattedDate)
            this.setState({ date: preVDay })
            this.props.dispatch(setMomentDate(moment(preVDay).format('YYYY-MM-DD')))
        }
        if(item === 'next'){
            let nextDay = date.add(1, 'days')
            let formattedDate = moment(nextDay).format('YYYY-MM-DD')
            this.getDashboardApi(formattedDate)
            this.setState({ date: nextDay })
            this.props.dispatch(setMomentDate(moment(nextDay).format('YYYY-MM-DD')))
        }
    }
    renderDate(){
        let { date } = this.state;
        if(date.format('LL') === moment().format('LL')){
            return 'TODAY'
        }else{
            return moment(this.state.date).format('LL')
        }
    }

    renderFoodItem(item){
        let { meal } = this.props.userData && this.props.userData.dashboardData
        if(meal){
            let filteredArray = meal.filter(itm => itm.foodItem.toLowerCase() === item.toLowerCase()) || []
            let {meal_list} = this.state;
            meal_list[item] = meal_list[item].cloneWithRows(filteredArray)
            this.setState({meal_list})
            return meal_list[item]
        }
    }

    checkedGoal(val){
        if(val.status){
            return <LinearGradient colors={['#f7b944', '#f49a3e', '#ef6937']} style={{paddingLeft: 10,borderRadius: 2,height: 20,paddingRight: 10,justifyContent: 'center'}}>
                        <Text style={[styles.blackTextNotBold,{color: '#fff',fontWeight: 'bold'}]} numberOfLines={1}>
                            {val.name}
                        </Text>
                    </LinearGradient>
        }else{
            return <Text style={[styles.blackTextNotBold,{marginLeft: 10}]}>{val.name}</Text>
        }
    }

    totalMealCalories = (item) => {
        if(item){
            let { totalBreakfastCalories, totalDinnerCalories, totalLunchCalories, totalSnacksCalories } = item
            let totalCalories = totalBreakfastCalories + totalLunchCalories + totalDinnerCalories + totalSnacksCalories
            return totalCalories
        }
    }

    totalGoal(){
        let { dashboardData } = this.props.userData
        if(dashboardData.Tasks){
            return dashboardData.Tasks.length
        }
    }

    completedGoal(val){
        let { dashboardData } = this.props.userData
        console.log(dashboardData,"dashboardData")
        if(dashboardData.Tasks){
            let completedGoals = dashboardData.Tasks.filter(itm => itm.status === val)
            console.log(completedGoals,"completedGoals")
            return completedGoals.length
        }
    }

    renderData(data){
        let { exercise_list, meal_list, bp_list, bg_list, tasks_list } = this.state;
        if(data.Exercise){
            this.setState({
                exercise_list: exercise_list.cloneWithRows(data.Exercise)
            });
        }
        if(data.Blood_pressure){
            this.setState({
                bp_list: bp_list.cloneWithRows(data.Blood_pressure)
            });
        }
        if(data.blood_glucose){
            this.setState({
                bg_list: bg_list.cloneWithRows(data.blood_glucose)
            });
        }
        if(data.Tasks){
            this.setState({
                tasks_list: tasks_list.cloneWithRows(data.Tasks)
            });
        }
        
    }
    renderProgressCalculation(){
        let { calories_details = {} } = this.props.userData && this.props.userData.dashboardData
        if(calories_details){
            let calculateCal = calories_details.calories_burned/calories_details.calories_consumed * 100
            console.log(calculateCal,"calculateCal")
            return calculateCal
        }
    }
    goalSlider(){
        let completedGoal = this.completedGoal(true)
        let totalGoal = this.totalGoal()
        let calGoal = completedGoal/totalGoal*100
        if(calGoal){
            return calGoal
        }
    }
    checkWeightType(){
        let { user_detail } = this.props.userData && this.props.userData.dashboardData
        if(user_detail){
            if(parseInt(user_detail.current_weight) > parseInt(user_detail.goal_weight)){
                return 'Lose'
            }else{
                return 'Gain'
            }
        }
    }

    changeGoalStatus(item){
        console.log(item,"item")
        let data = {
            id: item._id,
            status: !item.status
        }
        console.log(data,"datadatadatadatadata")
        let { date } = this.props.userData
        if(item){
            this.setState({ showLoader: true })
            this.props.dispatch(changeStatus(data)).then(res => {
                this.setState({ showLoader: false })
                this.props.dispatch(openToast(res.data.message))
                if(res.data.message === 'Goal status updated successfully'){
                    console.log(res,'resresresres')
                    this.getDashboardApi(date)
                }
            }).catch(err => {
                this.setState({ showLoader: false })
                this.props.dispatch(openToast(err.data.message))
            })
        }
    }

    onRemoveGoal(data,secId, rowId, rowMap){
        let apiData = {
            GoalId: data._id
        }
        let { date } = this.props.userData
        this.setState({ showLoader: true })
        this.props.dispatch(deleteGoal(apiData)).then(res => {
            this.props.dispatch(openToast(res.data.message))
            this.setState({ showLoader: false })
            if(res.data.message === 'Goal deleted successfully'){
                rowMap[`${secId}${rowId}`].props.closeRow()
                this.getDashboardApi(date)
            }
        }).catch(err => {
            this.setState({ showLoader: false })
        })
    }

    onChooseColor(item){
        console.log(item,"item")
        if(item){
            this.setState({ goalColor: item.color, goalDialog: false })
        }
    }

    render() {
        let { user, goalVisible, dashboardData, date } = this.props.userData
        let { user_detail } = this.props.userData && this.props.userData.dashboardData
        let { goalColorData, goalColor } = this.state;
        console.log(this.props.userData,"date123123")
        console.log(PixelRatio.get(),"user")
        return (
            <Container>
                <Content>
                    <View style={styles.gradientImg}>
                        <ImageBackground source={require('../../assets/images/plan-selection-bx2.png')} style={[styles.imageStyle,{justifyContent: 'center'}]}>
                            <View style={{paddingLeft: 70,height: 50,justifyContent: 'center'}}>
                                <View style={styles.imageAvatar}>
                                    <Image source={dashboardData.user_detail && dashboardData.user_detail.avatar ? {uri: dashboardData.user_detail && dashboardData.user_detail.avatar}: require('../../assets/images/person.jpg')} style={styles.imageStyle}/>
                                </View>
                                <View style={styles.flexRow}><Text style={styles.whiteText}>Hello</Text><Text style={styles.whiteTextNotBold}>  {user && user.name},</Text></View>
                                <Text style={styles.whiteText}>Things look alright</Text>
                            </View>
                        </ImageBackground>
                        <View style={styles.whiteImageView}></View>
                    </View>
                    <TouchableOpacity style={{position: 'absolute',width: 20,height: 15, left: 20,top: 30}} onPress={() => this.props.navigation.goBack()}>
                        <Image source={require('../../assets/images/back-btn.png')} style={styles.imageStyle} />
                    </TouchableOpacity>
                    <View style={styles.mainContainer}>
                        <View style={styles.alignRowGoals}>
                            <View style={styles.innerCon}>
                                <View>
                                    <Text style={styles.heading}>Goal</Text>
                                </View>
                                <View>
                                    <Text style={styles.content}>{this.checkWeightType()} weight</Text>
                                </View>
                            </View>
                            <View style={[styles.innerCon, styles.borderLeft]}>
                                <View>
                                    <Text style={styles.heading}>Latest weight, Jan 22</Text>
                                </View>
                                <View style={styles.contentInRow}>
                                    <Text style={styles.content}>{parseInt(user_detail && user_detail.current_weight)}</Text>
                                    <Text style={styles.contentValue}>kg</Text>
                                    <View style={styles.imageIconOut}>
                                        <Image source={require('../../assets/images/profileUp.png')} style={styles.imageMain} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.alignRowGoals]}>
                            <View style={[{paddingTop: 3,paddingBottom: 3,width: '100%'}]}>
                                <View style={[styles.topView,{marginTop: 0}]}>
                                    <Text style={styles.todatText}>{this.renderDate()}</Text>
                                    <TouchableOpacity style={styles.leftArrow} onPress={this.onChangeDate.bind(this, 'previous')}>
                                        {/* <Icon name="left" size={12} color="#6a6a6a"/> */}
                                        <Image source={require('../../assets/images/dashboard-meal-tab_03-1.png')} style={styles.imageStyle}/>
                                    </TouchableOpacity>
                                    {date !== moment().format('YYYY-MM-DD') && <TouchableOpacity style={[styles.rightArrow]} onPress={this.onChangeDate.bind(this, 'next')}>
                                        {/* <Icon name="right" size={12} color="#6a6a6a"/> */}
                                        <Image source={require('../../assets/images/dashboard-meal-tab_03.png')} style={styles.imageStyle}/>
                                    </TouchableOpacity>}
                                </View>
                                <View style={[styles.newView,{height: 25,borderBottomColor: '#fff',justifyContent: 'flex-end',marginBottom: 5}]}>
                                    <Text style={[styles.blackText,{paddingLeft: 10,paddingBottom: 3}]}>TODAY'S GOALS</Text>
                                    <TouchableOpacity style={[styles.rightSideBtn,{top: 8}]} onPress={this.openGoalModal.bind(this, true)}>
                                        <Text style={styles.orangeText}>+</Text>
                                        <Text style={[styles.orangeText,{marginLeft: 3}]}>Add goal/task</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{paddingLeft: 10,paddingRight: 10,borderColor: '#ebebeb',borderBottomWidth: 1}}>
                                    <Text style={[styles.orangeText,{fontSize: 7,marginBottom: -2}]}>{this.completedGoal(true)}/{this.totalGoal()} GOALS COMPLETED</Text>
                                    <Slider
                                        step={1}
                                        minimumValue={1}
                                        maximumValue={100}
                                        thumbTintColor={'#ec3b13'}
                                        minimumTrackTintColor="#ec3b13"
                                        value={this.goalSlider()}
                                        disabled={true}
                                        />
                                </View>
                                <View>
                                    {/* {dashboardData.Tasks && dashboardData.Tasks.length ? dashboardData.Tasks.map((item, key) => {
                                        return(
                                            <TouchableOpacity style={[styles.checkView,{height: 35,paddingLeft: 40,borderColor: item.color,paddingRight: 40,borderBottomWidth: 0.5}]} activeOpacity={0.9}>
                                                <View style={{position: 'absolute',height: 12,width: 12, borderRadius: 10, backgroundColor: item.color,left: 10}}></View>
                                                {this.checkedGoal(item)}
                                                <View style={[styles.checkBoxAbs,{top: 10}]}>{this.showChecked(item.status)}</View>
                                            </TouchableOpacity>
                                        )
                                    }): <View></View>} */}

                                    <List
                                        rightOpenValue={-75}
                                        disableRightSwipe={true}
                                        dataSource={this.state.tasks_list}
                                        renderRow={data =>
                                            <TouchableOpacity style={[styles.checkView,{height: 35,paddingLeft: 40,borderColor: data.color,paddingRight: 40,borderBottomWidth: 0.5}]} activeOpacity={0.9} onPress={this.changeGoalStatus.bind(this, data)}>
                                                <View style={{position: 'absolute',height: 12,width: 12, borderRadius: 10, backgroundColor: data.color,left: 10}}></View>
                                                {this.checkedGoal(data)}
                                                <View style={[styles.checkBoxAbs,{top: 10}]}>{this.showChecked(data.status)}</View>
                                            </TouchableOpacity>}
                                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                        <Button full danger onPress={_ => this.onRemoveGoal(data,secId, rowId, rowMap)} >
                                            <Icon active name="trash" style={{fontSize: 25}}/>
                                        </Button>}
                                    />
                                </View>
                            </View>
                        </View>
                        
                        <View style={[styles.alignRowGoals,{marginBottom: 10}]}>
                            <View style={[styles.padding10,{paddingTop: 5,paddingBottom: 5,width: '100%'}]}>
                                <View style={styles.topView}>
                                    <View style={styles.progressLeftView}>
                                        <Text style={styles.progressOuterText}>{dashboardData.calories_details && Math.ceil(dashboardData.calories_details.calories_consumed) || 0}</Text>
                                        <Text style={styles.smallText}>Eaten</Text>
                                    </View>
                                    <View style={styles.progressRightView}>
                                        <Text style={styles.progressOuterText}>{dashboardData.calories_details && Math.ceil(dashboardData.calories_details.calories_burned) ||0}</Text>
                                        <Text style={styles.smallText}>Burned</Text>
                                    </View>
                                    <View>
                                        <ProgressCircle
                                            percent={this.renderProgressCalculation()}
                                            radius={50}
                                            borderWidth={5}
                                            color="#f49b3e"
                                            shadowColor="#d8d7d7"
                                            bgColor="#fff"
                                        >
                                            <Text style={[styles.progressOuterText,{fontSize: 24,marginBottom: 5}]}>{dashboardData.calories_details && Math.ceil(dashboardData.calories_details.calories_left) || 0}</Text>
                                            <Text style={[styles.smallText,{marginBottom: 5}]}>Calories left</Text>
                                        </ProgressCircle>
                                        <View style={styles.detailButton}>
                                            <Text style={styles.detailText}>DETAIL</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.alignRowGoals]}>
                            <View style={[{paddingTop: 3,paddingBottom: 3,width: '100%'}]}>
                                <View style={[styles.newBiew,styles.newView]}>
                                    <Text style={[styles.blackText,{paddingLeft: 10,paddingBottom: 3}]}>LOG YOUR MEALS</Text>
                                </View>
                                <View style={[styles.paddingLeftRight10,styles.height80,{borderBottomWidth: 0.5,borderBottomColor: '#000'}]}>
                                    <View style={[styles.height40Center]}><Text style={[styles.blackText,{fontSize: 11,fontWeight: 'bold'}]}>Total: {this.totalMealCalories(dashboardData.calories_counts)} Cal</Text></View>
                                </View>
                                <View>
                                    <View style={[styles.paddingLeftRight10,styles.newView]}>
                                        <Text style={[styles.blackText]}>BREAKFAST</Text>
                                    </View>
                                    
                                    <List
                                        rightOpenValue={-75}
                                        disableRightSwipe={true}
                                        disableLeftSwipe={true}
                                        dataSource={this.state.meal_list.Breakfast}
                                        renderRow={data =>
                                        <View style={[styles.paddingLeftRight10,{paddingRight: 100,borderBottomWidth: 1,borderColor: '#f3f3f3',backgroundColor: '#fff',height: 70}]}>
                                            <View style={styles.height40Center}><Text style={[styles.greyText]}>{this.mealDate(data.dateTime)}</Text></View>
                                            <View style={[styles.height40Center,{justifyContent: 'flex-end'}]}><Text style={[styles.darkBlackText]}>{data.mealType}</Text></View>
                                            <View style={[styles.absViewSand,{height: 35,width: 55,top: 16,borderRadius: 4,overflow: 'hidden'}]}>
                                                <Image source={data.image ? {uri: data.image}: require('../../assets/images/breakfast.png')} style={styles.imageStyle}/>
                                            </View>
                                            <View style={[styles.newRow,{marginTop: 10}]}>
                                                <View style={[styles.newRow,{marginRight: 30}]}>
                                                    <View style={styles.imageHeightWidth}>
                                                        <Image source={require('../../assets/images/dashboard-meal-tab_11.png')} style={styles.imageStyle}/>
                                                    </View>
                                                    <Text style={styles.greyText}>{data.calories} Cal</Text>
                                                </View>
                                                <View style={[styles.newRow,{marginRight: 100}]}>
                                                    <View style={styles.imageHeightWidth}>
                                                        <Image source={require('../../assets/images/45428.png')} style={styles.imageStyle}/>
                                                    </View>
                                                    <Text style={styles.greyText} numberOfLines={1}>{data.foodQuantity} {data.type}</Text>
                                                </View>
                                            </View>
                                        </View>}
                                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                        <Button full danger >
                                            <Icon active name="trash" style={{fontSize: 35}}/>
                                        </Button>}
                                    />

                                    <View style={[styles.paddingLeftRight10,{height: 25,justifyContent: 'center',borderBottomWidth: 0.5}]}>
                                        <Text style={[styles.blackText,{fontSize: 11,fontWeight: 'bold'}]}>Total: {dashboardData.calories_counts && dashboardData.calories_counts.totalBreakfastCalories} Cal</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={[styles.paddingLeftRight10,styles.newView]}>
                                        <Text style={[styles.blackText]}>LUNCH</Text>
                                    </View>
                                        <List
                                            rightOpenValue={-75}
                                            disableRightSwipe={true}
                                            disableLeftSwipe={true}
                                            dataSource={this.state.meal_list.Lunch}
                                            renderRow={data =>
                                                <View style={[styles.paddingLeftRight10,{paddingRight: 100,borderBottomWidth: 1,borderColor: '#f3f3f3',backgroundColor: '#fff',height: 70}]}>
                                                <View style={styles.height40Center}><Text style={[styles.greyText]}>{this.mealDate(data.dateTime)}</Text></View>
                                                <View style={[styles.height40Center,{justifyContent: 'flex-end'}]}><Text style={[styles.darkBlackText]}>{data.mealType}</Text></View>
                                                <View style={[styles.absViewSand,{height: 35,width: 55,top: 16,borderRadius: 4,overflow: 'hidden'}]}>
                                                    <Image source={data.image ? {uri: data.image}: require('../../assets/images/breakfast.png')} style={styles.imageStyle}/>
                                                </View>
                                                <View style={[styles.newRow,{marginTop: 10}]}>
                                                    <View style={[styles.newRow,{marginRight: 30}]}>
                                                        <View style={styles.imageHeightWidth}>
                                                            <Image source={require('../../assets/images/dashboard-meal-tab_11.png')} style={styles.imageStyle}/>
                                                        </View>
                                                        <Text style={styles.greyText}>{data.calories} Cal</Text>
                                                    </View>
                                                    <View style={[styles.newRow,{marginRight: 100}]}>
                                                        <View style={styles.imageHeightWidth}>
                                                            <Image source={require('../../assets/images/45428.png')} style={styles.imageStyle}/>
                                                        </View>
                                                        <Text style={styles.greyText} numberOfLines={1}>{data.foodQuantity} {data.type}</Text>
                                                    </View>
                                                </View>
                                            </View>}
                                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                            <Button full danger  >
                                                <Icon active name="trash" style={{fontSize: 35}}/>
                                            </Button>}
                                        />

                                    <View style={[styles.paddingLeftRight10,{height: 25,justifyContent: 'center',borderBottomWidth: 0.5}]}>
                                        <Text style={[styles.blackText,{fontSize: 11,fontWeight: 'bold'}]}>Total: {dashboardData.calories_counts && dashboardData.calories_counts.totalLunchCalories} Cal</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={[styles.paddingLeftRight10,styles.newView]}>
                                        <Text style={[styles.blackText]}>DINNER</Text>
                                    </View>

                                    <List
                                        rightOpenValue={-75}
                                        disableRightSwipe={true}
                                        disableLeftSwipe={true}
                                        dataSource={this.state.meal_list.Dinner}
                                        renderRow={data =>
                                            <View style={[styles.paddingLeftRight10,{paddingRight: 100,borderBottomWidth: 1,borderColor: '#f3f3f3',backgroundColor: '#fff',height: 70}]}>
                                                <View style={styles.height40Center}><Text style={[styles.greyText]}>{this.mealDate(data.dateTime)}</Text></View>
                                                <View style={[styles.height40Center,{justifyContent: 'flex-end'}]}><Text style={[styles.darkBlackText]}>{data.mealType}</Text></View>
                                                <View style={[styles.absViewSand,{height: 35,width: 55,top: 16,borderRadius: 4,overflow: 'hidden'}]}>
                                                    <Image source={data.image ? {uri: data.image}: require('../../assets/images/breakfast.png')} style={styles.imageStyle}/>
                                                </View>
                                                <View style={[styles.newRow,{marginTop: 10}]}>
                                                    <View style={[styles.newRow,{marginRight: 30}]}>
                                                        <View style={styles.imageHeightWidth}>
                                                            <Image source={require('../../assets/images/dashboard-meal-tab_11.png')} style={styles.imageStyle}/>
                                                        </View>
                                                        <Text style={styles.greyText}>{data.calories} Cal</Text>
                                                    </View>
                                                    <View style={[styles.newRow,{marginRight: 150}]}>
                                                        <View style={styles.imageHeightWidth}>
                                                            <Image source={require('../../assets/images/45428.png')} style={styles.imageStyle}/>
                                                        </View>
                                                        <Text style={styles.greyText} numberOfLines={1}>{data.foodQuantity} {data.type}</Text>
                                                    </View>
                                                </View>
                                            </View>}
                                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                        <Button full danger >
                                            <Icon active name="trash" style={{fontSize: 35}}/>
                                        </Button>}
                                    />

                                    <View style={[styles.paddingLeftRight10,{height: 25,justifyContent: 'center',borderBottomWidth: 0.5}]}>
                                        <Text style={[styles.blackText,{fontSize: 11, fontWeight: 'bold'}]}>Total: {dashboardData.calories_counts && dashboardData.calories_counts.totalDinnerCalories} Cal</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={[styles.paddingLeftRight10,styles.newView]}>
                                        <Text style={[styles.blackText]}>SNACKS</Text>
                                    </View>
                                    <List
                                        rightOpenValue={-75}
                                        disableRightSwipe={true}
                                        disableLeftSwipe={true}
                                        dataSource={this.state.meal_list.Snacks}
                                        renderRow={data =>
                                            <View style={[styles.paddingLeftRight10,{paddingRight: 100,borderBottomWidth: 1,borderColor: '#f3f3f3',backgroundColor: '#fff',height: 70}]}>
                                                <View style={styles.height40Center}><Text style={[styles.greyText]}>{this.mealDate(data.dateTime)}</Text></View>
                                                <View style={[styles.height40Center,{justifyContent: 'flex-end'}]}><Text style={[styles.darkBlackText]}>{data.mealType}</Text></View>
                                                <View style={[styles.absViewSand,{height: 35,width: 55,top: 16,borderRadius: 4,overflow: 'hidden'}]}>
                                                    <Image source={data.image ? {uri: data.image}: require('../../assets/images/breakfast.png')} style={styles.imageStyle}/>
                                                </View>
                                                <View style={[styles.newRow,{marginTop: 10}]}>
                                                    <View style={[styles.newRow,{marginRight: 30}]}>
                                                        <View style={styles.imageHeightWidth}>
                                                            <Image source={require('../../assets/images/dashboard-meal-tab_11.png')} style={styles.imageStyle}/>
                                                        </View>
                                                        <Text style={styles.greyText}>{data.calories} Cal</Text>
                                                    </View>
                                                    <View style={[styles.newRow,{marginRight: 100}]}>
                                                        <View style={styles.imageHeightWidth}>
                                                            <Image source={require('../../assets/images/45428.png')} style={styles.imageStyle}/>
                                                        </View>
                                                        <Text style={styles.greyText} numberOfLines={1}>{data.foodQuantity} {data.type}</Text>
                                                    </View>
                                                </View>
                                            </View>}
                                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                        <Button full danger >
                                            <Icon active name="trash" style={{fontSize: 35}}/>
                                        </Button>}
                                    />

                                    <View style={[styles.paddingLeftRight10,{height: 25,justifyContent: 'center'}]}>
                                        <Text style={[styles.blackText,{fontSize: 11, fontWeight: 'bold'}]}>Total: {dashboardData.calories_counts && dashboardData.calories_counts.totalSnacksCalories} Cal</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.alignRowGoals,{flexDirection: 'column'}]}>
                            <View style={[styles.newBiew,styles.newView]}>
                                <Text style={[styles.blackText,{paddingLeft: 10}]}>LOG YOUR EXERCISE</Text>
                            </View>
                            <List
                                disableRightSwipe={true}
                                disableLeftSwipe={true}
                                rightOpenValue={-75}
                                dataSource={this.state.exercise_list}
                                renderRow={data =>
                                <View style={[styles.paddingLeftRight10,{paddingRight: 40,borderBottomWidth: 1,borderColor: '#f3f3f3',backgroundColor: '#fff', height: 70}]}>
                                    <View style={styles.height40Center}><Text style={[styles.greyText]}>{this.mealDate(data.dateTime)}</Text></View>
                                    <View style={[styles.height40Center,{justifyContent: 'flex-end'}]}><Text style={[styles.darkBlackText]}>{data.name}</Text></View>
                                    <View style={[styles.absViewSand,{height: 50,width: 50,top: 10,right: 10}]}>
                                        <Image source={data.image ? {uri: data.image} : require('../../assets/images/dashboard-meal-tab-icons_24.png')} style={styles.imageStyle}/>
                                    </View>
                                    <View style={[styles.newRow,{marginTop: 10}]}>
                                        <View style={[styles.newRow,{marginRight: 30}]}>
                                            <View style={styles.imageHeightWidth}>
                                                <Image source={require('../../assets/images/dashboard-meal-tab_07.png')} style={styles.imageStyle}/>
                                            </View>
                                            <Text style={styles.greyText}>{data.duration_value} {data.duration_type}</Text>
                                        </View>
                                        <View style={[styles.newRow,{marginRight: 30}]}>
                                            <View style={styles.imageHeightWidth}>
                                                <Image source={require('../../assets/images/dashboard-meal-tab_09.png')} style={styles.imageStyle}/>
                                            </View>
                                            {!data.distance_value ? <Text style={styles.greyText}>{data.intensity}</Text>: <Text style={styles.greyText}>{data.distance_value} {data.distance_type}</Text>}
                                        </View>
                                        <View style={styles.newRow}>
                                            <View style={styles.imageHeightWidth}>
                                                <Image source={require('../../assets/images/dashboard-meal-tab_11.png')} style={styles.imageStyle}/>
                                            </View>
                                            <Text style={styles.greyText}>{Math.ceil(data.calories)} Cal</Text>
                                        </View>
                                    </View>
                                </View>}
                                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full danger >
                                    <Icon active name="trash" style={{fontSize: 35}}/>
                                </Button>}
                            />
                        </View>
                        <View style={[styles.alignRowGoals,{flexDirection: 'column'}]}>
                            <View style={[styles.newBiew,styles.newView]}>
                                <View style={{marginRight: 120}}><Text style={[styles.blackText,{paddingLeft: 10,paddingBottom: 3}]}>LOG YOUR BLOOD PRESSURE</Text></View>
                            </View>
                            <List
                                disableRightSwipe={true}
                                disableLeftSwipe={true}
                                dataSource={this.state.bp_list}
                                renderRow={data =>
                                    <View style={[styles.paddingLeftRight10,{paddingRight: 40,borderBottomWidth: 1,borderColor: '#f3f3f3',backgroundColor: '#fff',height: 70}]}>
                                        <View style={styles.height40Center}><Text style={[styles.greyText,{marginBottom: 4,marginTop: 4}]}>{this.mealDate(data.dateTime)}</Text></View>
                                        <View style={[styles.height40Center,{justifyContent: 'flex-end'}]}><Text style={[styles.darkBlackText]}>{data.Systolic}/{data.Diastolic} mmHg</Text></View>
                                        <Text style={[styles.greyText,{marginTop: 8}]}>Pulse: {data.Pulse} bpm</Text>
                                        <View style={[styles.absViewSand,{height: 45,width: 50,top: 13,right: 10}]}>
                                            <Image source={require('../../assets/images/dashboard-meal-tab-icons_31.png')} style={styles.imageStyle}/>
                                        </View>
                                    </View>}
                                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full danger >
                                    <Icon active name="trash" style={{fontSize: 35}}/>
                                </Button>}
                            />

                        </View>
                        <View style={[styles.alignRowGoals,{flexDirection: 'column'}]}>
                            <View style={[styles.newBiew,styles.newView]}>
                            <View style={{marginRight: 120}}><Text style={[styles.blackText,{paddingLeft: 10,paddingBottom: 3}]}>LOG YOUR BLOOD GLUCOSE</Text></View>
                            </View>
                            <List
                                rightOpenValue={-75}
                                disableRightSwipe={true}
                                disableLeftSwipe={true}
                                dataSource={this.state.bg_list}
                                renderRow={data =>
                                    <View style={[styles.paddingLeftRight10,{paddingRight: 40,borderBottomWidth: 1,borderColor: '#f3f3f3',backgroundColor: '#fff',height: 70}]}>
                                    <View style={styles.height40Center}><Text style={[styles.greyText]}>{this.mealDate(data.dateTime)}</Text></View>
                                    <View style={styles.height40Center}><Text style={[styles.darkBlackText]}>{data.reading} mg/dl</Text></View>
                                    <View style={[styles.absViewSand,{height: 50,width: 40,top: 10,right: 10}]}>
                                        <Image source={require('../../assets/images/dashboard-meal-tab-icons_35.png')} style={styles.imageStyle}/>
                                    </View>
                                    <View style={[styles.newRow,{marginTop: 10}]}>
                                        <View style={[styles.newRow,{marginRight: 30}]}>
                                            <View style={styles.imageHeightWidth}>
                                                <Image source={require('../../assets/images/dashboard-meal-tab_07.png')} style={styles.imageStyle}/>
                                            </View>
                                            <Text style={styles.greyText}>{data.type} {data.duration_type}</Text>
                                        </View>
                                        <View style={[styles.newRow,{marginRight: 30}]}>
                                            <View style={styles.imageHeightWidth}>
                                                <Image source={require('../../assets/images/dashboard-meal-tab_09.png')} style={styles.imageStyle}/>
                                            </View>
                                            <Text style={styles.greyText}>Manual</Text>
                                        </View>
                                    </View>
                                </View>}
                                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                <Button full danger >
                                    <Icon active name="trash" style={{fontSize: 35}}/>
                                </Button>}
                            />
                            
                        </View>
                        <View style={[styles.alignRowGoals,{flexDirection: 'column',marginBottom: 10}]}>
                            <TouchableOpacity style={[styles.newBiew,styles.newView]} onPress={() => this.props.navigation.navigate('ConnectApp')}>
                                <Text style={[styles.blackText,{paddingLeft: 10,paddingBottom: 3}]}>CONNECT APPS</Text>
                            </TouchableOpacity>
                            <View >
                                <TouchableOpacity style={styles.checkView} onPress={() => this.setState({ checked: !this.state.checked})} activeOpacity={0.9}>
                                    <Text style={styles.blackText}>Google Fit</Text>
                                    <View style={[styles.checkBoxAbs,{top: 6}]}>{this.showCheck()}</View>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.checkView,{borderBottomWidth: 0}]} onPress={() => this.setState({ isChecked: !this.state.isChecked})} activeOpacity={0.9}>
                                    <Text style={styles.blackText}>Fitbit</Text>
                                    <View style={[styles.checkBoxAbs,{top: 6}]}>{this.showChecked()}</View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <DialogBox visible={goalVisible} openCloseModal={this.openGoalModal} headingText="ADD GOAL" content={this.goalContent} propStyle={{height: 280}} height={{height: '100%'}}/>
                    <Dialog
                        visible={this.state.goalDialog}
                        dialogAnimation={new SlideAnimation({
                        slideFrom: 'right',
                        })}
                        onTouchOutside={() => {
                            this.setState({ goalDialog: false })
                        }}
                        dialogStyle={{backgroundColor: '#fff',borderRadius: 4,padding: 0, alignSelf: 'flex-end',marginBottom: 140, marginRight: 19}}
                        containerStyle={{justifyContent: 'flex-end',padding: 0}}
                    >
                        <DialogContent contentContainer={{backgroundColor: 'yellow'}}>
                            <View style={{height: 66, width: 70,marginLeft: -20,marginRight: -20}}>
                                {goalColorData.map((item, key) => {
                                    return(
                                        <TouchableOpacity style={{flexDirection: 'row',height: 30, alignItems: 'center',paddingLeft: 15,borderBottomWidth: 0.5,borderBottomColor: '#aba6a6'}} onPress={this.onChooseColor.bind(this, item)} key={key}>
                                            <View style={{width: 15, height: 15, borderRadius: 10,backgroundColor: item.color, marginRight: 15}}></View>
                                            {goalColor === item.color && <View style={{position: 'absolute',right: 15}}><Icons name="check" size={15} color={item.color}/></View>}
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        </DialogContent>
                    </Dialog>
                </Content>
                {this.handelLoader()}
            </Container>
        )
    }
}

export default connect(state => state)(Dashboard)

const styles = StyleSheet.create({
    gradientImg: {
        height: 180,
        width: width
    },
    imageStyle: {
        width: '100%',
        height: '100%'
    },
    whiteImageView: {
        height: 220,
        width: 220,
        borderRadius: 110,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: -110,
        right: -110
    },
    mainContainer: {
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: -50
    },
    alignRowGoals: {
        marginTop: 15,
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        elevation: 7,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { height: 2, width: 1 },
        borderRadius: 5
    },
    innerCon: {
        width: '50%',
        padding: 10
    },
    heading: {
        color: "#1c4c9f",
        fontSize: 10
    },
    content: {
        fontSize: 17.5,
        marginTop: 5,
        color: '#202020'
    },
    borderLeft: {
        borderLeftWidth: 1,
        borderLeftColor: "#eeeeee"
    },
    contentInRow: {
        flexDirection: "row"
    },
    contentValue: {
        fontSize: 12.5,
        marginTop: 10,
        marginLeft: 5,
        color: '#000'
    },
    imageIconOut: {
        height: 20,
        width: 20,
        marginTop: 10,
        position: 'absolute',
        right: 0,
        top: 0
    },
    imageMain: {
        height: '100%',
        width: '100%',
    },
    padding10: {
        padding: 10
    },
    topView: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 5
    },
    leftArrow: {
        height: 20,
        width: 20,
        position: 'absolute',
        top: 0,
        left: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightArrow: {
        height: 20,
        width: 20,
        position: 'absolute',
        top: 0,
        right: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    todatText: {
        color: '#202020',
        fontSize: 10,
        textAlign: 'center',
        marginTop: 3
    },
    progressLeftView: {
        position: 'absolute',
        left: 30,
        top: 30,
    },
    progressRightView: {
        position: 'absolute',
        right: 30,
        top: 30
    },
    smallText: {
        fontSize: 10,
        color: '#919191',
        textAlign: 'center'
    },
    progressOuterText: {
        fontSize: 15,
        color: '#202020',
        textAlign: 'center'
    },
    detailButton: {
        padding: 5,
        paddingTop: 1,
        paddingBottom: 1,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e9e9e9',
        width: 45,
        position: 'absolute',
        bottom: -5,
        backgroundColor: '#fff',
        left: 28,
        height: 18
    },
    detailText: {
        color: '#bcbcbc',
        fontSize: 9
    },
    todayView: {
        marginTop: 15,
        marginLeft: 5,
        marginBottom: 10
    },
    todayStatText: {
        color: '#2d2d2d',
        fontSize: 16,
        fontWeight: 'bold'
    },
    blackText: {
        color: '#202020',
        fontSize: 9
    },
    darkBlackText: {
        color: '#202020',
        fontSize: 11,
        fontWeight: 'bold'
    },
    borderline: {
        borderWidth: 0.5,
        height: 0.5,
        borderColor: '#ebebeb',
        marginLeft: -10,
        marginRight: -10,
        marginTop: 5
    },
    absViewCon: {
        position: 'absolute',
        right: 0,
        top: 0
    },
    checkBoxMain: {
        height: 20,
        width: 20
    },
    checkboxOut: {
        height: 13,
        width: 13,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 4
    },
    checkBoxAbs: {
        position: 'absolute',
        right: 10,
        top: 15
    },
    checkView: {
        height: 25,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: '#ebebeb',
        paddingLeft: 10,
        paddingRight: 10
    },
    rightSideBtn: {
        position: 'absolute',
        flexDirection: 'row',
        right: 10,
        top: 4
    },
    orangeText: {
        color: '#ec3b13',
        fontSize: 10,
        fontWeight: 'bold'
    },
    paddingLeftRight10: {
        paddingLeft: 10,
        paddingRight: 10
    },
    greyText: {
        color: '#919191',
        fontSize: 9
    },
    blackTextNotBold: {
        color: '#3c3c3c',
        fontSize: 9
    },
    absViewSand: {
        position: 'absolute',
        right: 10,
        width: 40,
        height: 25,
        top: 10
    },
    newBiew: {
        height: 25,
        justifyContent: 'center',
        width: '100%'
    },
    flexRow: {
        flexDirection: 'row'
    },
    whiteText: {
        color: '#fff',
        fontSize: 12
    },
    whiteTextNotBold: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
    },
    imageAvatar: {
        height: 45,
        width: 45,
        borderRadius: 25,
        backgroundColor: '#eee',
        overflow: 'hidden',
        position: 'absolute',
        left: 15
    },
    buttonShadow: {
        elevation: 4,
        shadowColor: "#000000",
        shadowOpacity: 0.4,
        shadowRadius: 5,
        shadowOffset: { height: 2, width: 1 }
    },
    contentMainView: {
        padding: 20,
        flexDirection: 'row',
        width: '100%',
        paddingBottom: 0,
        justifyContent: 'space-between'
    },
    imageMealStyle: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    marginRight20: {
        marginRight: 20
    },
    notificationView: {
        position: 'absolute',
        height: 35,
        width: 35,
        right: 10,
        top: 10,
        padding: 10
    },
    textField: {
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 5,
        display: 'flex',
        height: 40,
        paddingLeft: 22,
        paddingRight: 22,
        fontSize: 12
    }, 
    newView: {
        height: 25,
        justifyContent: 'center',
        borderBottomWidth: 1, 
        borderColor: '#ebebeb'
    },
    height80: {
        height: 25,
        borderBottomWidth: 1,
        borderColor: '#ebebeb',
        justifyContent: 'center'
    },
    height40Center: {
        height: 20,
        justifyContent: 'center'
    },
    newRow: {
        flexDirection: 'row'
    },
    imageHeightWidth: {
        flexDirection: 'row',
        height: 10,
        width: 10,
        marginRight: 10
    },
    checkedGoal: {
        backgroundColor: 'orange',
        padding: 10,
        color: '#fff',
        fontWeight: 'bold'
    }
})