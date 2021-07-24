import React, { useEffect, useState } from "react";
import CourseTable from "../components/CourseTable";
import { CourseServices } from "../services/CourseService";
import cookie from 'react-cookies';
import {JWT_TOKEN_COOKIE_NAME} from '../constants';
import CourseActionAlert from "../components/alerts/CourseActionAlert";
export default function AllCourses() {
    // 1. call backend API to get data, via XHR
    // 2. setState to trigger re-render
    const token = cookie.load(JWT_TOKEN_COOKIE_NAME);
    const [courses, setCourses] = useState([]);
    // alerts
    const [alertOpen, setAlertOpen] = useState();
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");


    useEffect(() => {
        CourseServices.getAllCourses()
        .then(response => {
            setCourses(response.data);
        })
        .catch(error => console.log(error))
    },[]);


    return (  // 传入一个函数的引用 1. arrow func; 2. function reference
        <div>
            <CourseActionAlert 
                alertSeverity={alertSeverity} 
                alertMessage={alertMessage} 
                open={alertOpen} 
                onAlertClick={() => onAlertClick()}/>  
            <CourseTable 
                courses={courses} 
                actionButtonLabel={token ? "Enroll" : null} 
                onActionButtonClick={enrollCourse}/>
        </div>
    );

    // enroll a course
    function enrollCourse(course) {
        CourseServices.enrollCourse(course.course_name, token)
            .then(response => {
                // alert(`Successfully enrolled Course ${course.course_name}`);
                setAlertOpen(true);
                setAlertSeverity("success");
                setAlertMessage(`Successfully enrolled Course ${course.course_name}`);
            })
            .catch(error => {
                // alert(`Failed to enroll Course ${course.course_name} ${error}`);
                setAlertOpen(true);
                setAlertSeverity("error");
                setAlertMessage(`Failed to enroll Course. ${course.course_name} ${error}`);
            });
    }

    // 关掉弹窗的动作
    function onAlertClick() {
        setAlertOpen(false);
    }
}

