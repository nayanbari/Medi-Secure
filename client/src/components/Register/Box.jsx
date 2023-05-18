import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { DoctorProfile, localStep, Profile } from '../../api/api'
import { data } from '../../api/data'
import Appointment from '../Appointment/Appointment'
import DocData from '../Doctor/DocData'
import DocLogin from '../Doctor/DocLogin'
import DocRegister from '../Doctor/DocRegister'
import PersonalMedical from '../PersonalMedical/PersonalMedical'
import Search from '../SearchPatient/Search'
import UserCard from '../UserCard/UserCard'
import UserData from '../UserData/UserData'
import UserProfile from '../UserProfile/UserProfile'
import Login from './Login'
import Form from './subComponetnts/Form'
import Left_Nav from './subComponetnts/Left_Nav'
import Right_Nav from './subComponetnts/Right_Nav'

const Box = () => {

  const location = useLocation();

  const path = location.pathname;

  console.log(path)
  
  const [step,setStep] = useState(path.includes("user") ? 11 : localStep);
  
  console.log(path.includes("user"), localStep)
  const RenderComponent = () => {
    let choice = step;

    switch(choice){
      case 1:
      //User Profile / User Form Comp
      return Profile ? <UserData setStep={setStep} /> : <><Right_Nav /><Form /></>;

      case 2:
      //User Form for New Registration
      return <><Right_Nav /><Form /></>
      

      case 3:
        //Doctor Form / Doctor Profile
        return DoctorProfile ? <DocData setStep={setStep} /> : <DocRegister setStep={setStep} />;

      case 4:
        return <Appointment setStep={setStep} />

      case 5:
        return <h1>Chats</h1>

      case 6:
        return <h1>Settings</h1>

      case 7:
        return <h1>Logout</h1>
      
      case 8:
        //Doctor Register Page
        return <DocRegister setStep={setStep} />
      
      case 9:
        //Doctor Login Page
        return <DocLogin setStep={setStep} />
      
      case 10:
        //Search Patient User
        return <Search setStep={setStep} />
      
      case 11:
        return <UserProfile />

      case 12:
        return <UserCard />

      case 13:
        return <Login setStep={setStep} /> 
      
      case 14:
        return <PersonalMedical />
    }
  }
  
  window.localStorage.setItem("state",step);

  return (
    <div className='bg-white w-10/12 rounded-lg flex md:flex-row flex-col m-8'>
    <Left_Nav profile={Profile} setStep={setStep} />
    <div className='w-full'>
        {RenderComponent()}
    </div>
    </div>
  )
}

export default Box