import React from "react";
import CourseTable from "../components/CourseTable";
import { JWT_TOKEN_COOKIE_NAME } from "../constants";
import { CourseServices } from "../services/CourseService";
import cookie from "react-cookies";
import CourseActionAlert from "../components/alerts/CourseActionAlert";
export default class EnrolledCourses extends React.Component {
    
    state = {
        enrolledCourses: [],
        alertOpen: false,
        alertMessage: "",
        alertSeverity: "",
    };

    constructor(props) {
        super(props);
        this.withdrawCourse = this.withdrawCourse.bind(this);
    }

    componentDidMount() {
        // xhr request
        this.getEnrolledCourses();
    }

    render() {
        return (
            <div>
                <CourseActionAlert
                    alertServerity={this.state.alertSeverity}
                    alertMessage={this.state.alertMessage}
                    open={this.state.alertOpen}
                    onAlertClick={() => this.setState({alertOpen: false})}
                />
                <CourseTable
                    courses={this.state.enrolledCourses} 
                    actionButtonLabel={"Withdraw"} 
                    onActionButtonClick={this.withdrawCourse}
                    />
            </div>

        );
    }

    withdrawCourse(course) {
        const token = cookie.load(JWT_TOKEN_COOKIE_NAME);
        CourseServices.withdrawCourse(course.course_name, token)
            .then(response => {
                // alert(`Successfully withdrawn Course ${course.course_name}`);
                this.getEnrolledCourses();
                this.setState({
                    alertOpen: true,
                    alertMessage: `Successfully withdrawn Course ${course.course_name}`,
                    alertSeverity: "success",
                })
            })
            .catch(error => {
                // alert(`Fail to enroll Course ${course.course_name}`);
                this.setState({
                    alertOpen: true,
                    alertMessage: `Fail to enroll Course ${course.course_name}`,
                    alertSeverity: "error",
                })
                
            });
    }

    getEnrolledCourses() {
        CourseServices.getEnrolledCourses(cookie.load(JWT_TOKEN_COOKIE_NAME))
        .then(response => { //response 有后端传回来的数据
            this.setState({
                enrolledCourses: response.data,
            });
        })
        .catch(error => console.log(error));
    }

}