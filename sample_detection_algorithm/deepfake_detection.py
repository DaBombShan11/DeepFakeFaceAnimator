import os
import numpy as np
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import ImageDataGenerator, load_img, img_to_array
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import Flatten, Dense, Dropout
from tensorflow.keras.applications import Xception
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.applications.xception import preprocess_input
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping

#Training images are stored in computer files named "dataset/real" and "dataset/fake"
real_dir = 'dataset/real'
fake_dir = 'dataset/fake'

#Data preprocessing and augmentation
datagen = ImageDataGenerator(
    rescale=1.0/255.0, 
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    fill_mode='nearest',
    validation_split=0.2
)

train_data = datagen.flow_from_directory(
    'dataset',
    target_size=(224, 224),
    batch_size=32,
    class_mode='binary',
    subset='training'
)

validation_data = datagen.flow_from_directory(
    'dataset',
    target_size=(224, 224),
    batch_size=32,
    class_mode='binary',
    subset='validation'
)

#Load pre-trained Xception model
base_model = Xception(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

#Freeze layers of the base model
base_model.trainable = False

#Create the model
model = Sequential([
    base_model,
    Flatten(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

#Compile the model
model.compile(optimizer=Adam(learning_rate=0.0005), loss='binary_crossentropy', metrics=['accuracy'])

model.summary()

#Callbacks
checkpoint = ModelCheckpoint('best_model.keras', monitor='val_accuracy', save_best_only=True, mode='max', verbose=1)
early_stop = EarlyStopping(monitor='val_accuracy', patience=5, restore_best_weights=True, verbose=1)

#Train the model
history = model.fit(
    train_data,
    epochs = 25, #loops training 25 times
    validation_data=validation_data,
)

#Plot training & validation accuracy values
plt.plot(history.history['accuracy'])
plt.plot(history.history['val_accuracy'])
plt.title('Model accuracy')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend(['Train', 'Test'], loc='upper left')
plt.show()

#Save the model
model.save('deepfake_detector.keras')

print(f"Training complete!")

#Load the trained model
model = load_model('deepfake_detector.keras')

#The path of the image you want the algorithm to test 
test_image_path = '/Users/SydneyBrutus/Downloads/smilinggirl.jpg'

#Load/Preprocess the image
img = image.load_img(test_image_path, target_size=(224, 224))
img_array = image.img_to_array(img) / 255.0
img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

#Print the exact image in your computer file
print(f"Testing image: {test_image_path}")

#Make a prediction
prediction = model.predict(img_array)

if prediction >= 0.5:
    print(f"I predict the image is fake (Probability: {prediction[0][0]:.2f})")
else:
    print(f"I predict the image is real (Probability: {1 - prediction[0][0]:.2f})")


#Display the image that you wanted the model to predict
plt.imshow(img)
plt.title('Test Image')
plt.axis('off')
plt.show()

#Terminate the system
import sys
sys.exit()


#Run this command in the terminal
#python3 deepfake_detection.py
