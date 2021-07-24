from rest_framework import serializers

from courses.models import Course


# class CourseSerializer(serializers.serializer):
#     # id, course_name, course_location, course_content, teacher id
#     id = serializers.IntegerField()
#     course_name = serializers.CharField(required=True, allow_blank=False, allow_null=False, max_length=100)
#     course_location = serializers.CharField(required=True, allow_blank=False, allow_null=False, max_length=30)
#     course_content = serializers.CharField(required=True, allow_blank=False, allow_null=False, max_length=200)
#     teacher_id = serializers.IntegerField(required=True, allow_null=False)
#
#     def create(self, data):
#         return Course.objects.create(**data)
#
#     def update(self, instance, data):
#         instance.course_name = data.get('course_name', instance.course_name)
#         instance.course_location = data.get('course_name', instance.course_location)

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'course_name', 'course_location', 'course_content', 'teacher_id']
        # fields = "__all__"