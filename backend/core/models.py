from django.db import models

# Create your models here.

class ID_Manager(models.Model):
    current_id = models.IntegerField(default=0)

    def __str__(self):
        return str(self.current_id)
