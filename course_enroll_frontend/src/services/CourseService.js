import axios from "../axios"

// 从后端读取data helper class
export const CourseServices = {
    getAllCourses: function() {
        return axios.get('/courses/');
    },
    getEnrolledCourses: function(token) {
        return axios.get('/user/courses', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }); 
    },
    enrollCourse: function(courseName, token) {
        // http method: POST; url: /user/course/{coursename}
        console.log(token)
        return axios.post(`user/course/${courseName}/`, {}, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },
    withdrawCourse: function(courseName, token) {
        // http method: Delete; url: /user/course/{coursename}
        return axios.delete(`user/course/${courseName}/`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    },
}
