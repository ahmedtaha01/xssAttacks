# Use official Python 3.9 image
FROM python:3.9-slim


# Set working directory
WORKDIR /app

RUN apt-get update && apt-get install -y sqlite3

# Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose port (Flask default)
EXPOSE 5001

# Run the app
CMD ["python", "app.py"]
