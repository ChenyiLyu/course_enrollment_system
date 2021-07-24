from django.contrib.auth import authenticate
from django.shortcuts import render

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from courses.models import Course
from courses.serializers import CourseSerializer


class CourseViewSet(viewsets.ViewSet):
    # get all courses
    # 1. GET 2.url: /courses 3.no input 4.response: 200, all courses data
    @action(detail=False, methods=["GET"])
    def courses(self, request):
        courses = Course.objects.all()
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserCourseViewSet(viewsets.ViewSet):

    # def get_user(self):
    #     return authenticate(username="admin", password="admin")
    permission_classes = (IsAuthenticated,)
    # enroll a class
    # 1. http method: POST; 2. url: /user/course/{course_name}; 3.user input: url token; 4.response: 204, empty content
    @csrf_exempt
    @action(detail=False, methods=["POST"], url_path="course/(?P<course_name>[\w\s]+)")
    def course(self, request, **kwargs): # rest parameter
        course_name = kwargs["course_name"]
        course = Course.objects.filter(course_name=course_name).first()
        if course is None:
            raise Exception("Course not existed!")
        user = request.user
        if user in course.user.all():
            raise Exception("Course already enrolled!")
        course.user.add(user)
        return Response({}, status=status.HTTP_204_NO_CONTENT)

    # get enrolled courses
    # 1. GET; 2. url: /user/courses/; 3. user input: No input; 4.response: return enrolled courses, 200
    @action(detail=False, methods=["GET"])
    def courses(self, request):
        user = request.user
        courses = user.courses.all() # list of course objects
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 1. DELETE 2.url: /user/course/{course_name} 3.user input: url token 4.response: 204, empty content
    @course.mapping.delete
    @action(detail=False, methods=["DELETE"], url_path="course/(?P<course_name>[\w\s]+)")
    def drop_course(self, request, **kwargs):
        course_name = kwargs["course_name"]
        user = request.user
        course = Course.objects.filter(course_name=course_name).first()
        if course is None:
            raise Exception("Course not existed!")
        if course not in user.courses.all(): # if user not in course.user.all()
            raise Exception("Course not enrolled!")
        course.user.remove(user)
        return Response({}, status=status.HTTP_204_NO_CONTENT)