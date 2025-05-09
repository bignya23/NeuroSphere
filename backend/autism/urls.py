from django.urls import path, re_path, include
from . import views


urlpatterns = [
    path("chatbot/", views.autism_chatbot, name="autism_chatbot"),
    path("chatvoice/", views.autism_chatvoice, name="autism_chatvoice"),
    path("tasks_generate/", views.tasks_generate, name="tasks_generate"),
    path("sos/", views.sos_alert, name="sos_alert"),
    path("emergency/", views.emergency, name="emergency"),
    path("resume_generate/", views.generate_resume, name="generate_resume"),
    path("schedule_generate/", views.generateSchedule, name="generateSchedule"),
    path("job_search/" , views.job_search_route , name="job_search"),
    path("second_assessment/" , views.second_assessment , name="second_assessment"),
    path("second_assessment_result/" , views.second_assessment_result , name="second_assessment_result"),
    path("generate_flowchart/" , views.generate_flowchart , name="generate_flowchart"),
    path("flowchart_chatbot/" , views.flowchart_chatbot , name="flowchart_chatbot"),
    path("flowchart_pdf/" , views.flowchart_pdf , name="flowchart_pdf")
]