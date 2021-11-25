from django.db import models
from django.db.models.deletion import CASCADE

# Create your models here.
class Product(models.Model):
    name        = models.CharField(max_length=200)
    image       = models.ImageField(upload_to='static\images')

    def __str__(self) :
        return self.name
    
    def get_ratings(self):
        return self.productrating_set.all()

    @property
    def calculateAvgRating(self):
        allRatings = self.productrating_set.all()
        total = 0
        count = allRatings.count()
        if count > 0:
            for r in allRatings:
                total = total + r.rating
            return round((total / count),1)
        else:
            return 0

    @property
    def calculateNumberOfRatings(self):
        allRating = self.productrating_set.all()
        numberOfRatings = allRating.count()
        print(allRating.count())
        return numberOfRatings




class ProductRating(models.Model):
    product     = models.ForeignKey(Product,on_delete=models.CASCADE)
    rating      = models.IntegerField(default=0)
    comment     = models.TextField(max_length=300)
    created     = models.DateTimeField(auto_now_add=True)

