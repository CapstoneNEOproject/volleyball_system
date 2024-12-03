from django.http import HttpResponse
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import os

@csrf_exempt
def save_data(request):
    if request.method == "POST":
        file_path = os.path.join(settings.BASE_DIR, "src/data/adminData.json")
        try:
            with open(file_path, "w") as file:
                json.dump(json.loads(request.body), file, indent=4)
            return JsonResponse({"message": "Data saved successfully!"}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

def home(request):
    return HttpResponse("Welcome to the Volleyball Platform!")


