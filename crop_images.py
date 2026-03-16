#!/usr/bin/env python3
from PIL import Image, ImageChops
import os

def crop_white_space(image_path, output_path, margin=10):
    """Обрезает белое пространство вокруг изображения"""
    # Открываем изображение
    img = Image.open(image_path)

    # Конвертируем в RGB если нужно
    if img.mode != 'RGB':
        img = img.convert('RGB')

    # Создаём фон для сравнения
    bg = Image.new(img.mode, img.size, (255, 255, 255))

    # Находим разницу
    diff = ImageChops.difference(img, bg)

    # Конвертируем в grayscale и инвертируем
    diff = diff.convert('L')

    # Находим bbox (границы непрозрачной области)
    bbox = diff.getbbox()

    if bbox:
        # Добавляем небольшой отступ
        left, top, right, bottom = bbox
        width, height = img.size

        # Уменьшаем bbox для более агрессивной обрезки
        # Увеличиваем обрезку с каждой стороны
        crop_margin = margin
        left = max(0, left + crop_margin)
        top = max(0, top + crop_margin)
        right = min(width, right - crop_margin)
        bottom = min(height, bottom - crop_margin)

        # Обрезаем изображение
        cropped = img.crop((left, top, right, bottom))

        # Сохраняем
        cropped.save(output_path, quality=95)
        print(f"✓ Обрезано: {image_path}")
        print(f"  Исходный размер: {img.size}")
        print(f"  Новый размер: {cropped.size}")
    else:
        # Если не нашли границы, просто копируем
        img.save(output_path, quality=95)
        print(f"⚠ Не удалось найти границы для: {image_path}")

# Пути к файлам
base_path = "/Users/zaripovkarim86gmail.com/Desktop/HK Site-project/HK-Site-project/images"
logo_path = os.path.join(base_path, "logo.jpeg")
institute_path = os.path.join(base_path, "institute.jpeg")

# Создаём резервные копии
print("Создаём резервные копии...")
os.system(f'cp "{logo_path}" "{logo_path}.backup"')
os.system(f'cp "{institute_path}" "{institute_path}.backup"')

# Обрезаем изображения с разными настройками
print("\nОбрезаем изображения...")
# Для logo - больше обрезать (margin=30)
crop_white_space(logo_path, logo_path, margin=30)
# Для institute - меньше обрезать, оставить больше белого (margin=-10, отрицательный = меньше обрезаем)
crop_white_space(institute_path, institute_path, margin=-10)

print("\n✅ Готово! Резервные копии сохранены как .backup")
