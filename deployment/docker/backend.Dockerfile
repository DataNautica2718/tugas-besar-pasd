FROM python:3.11-slim

WORKDIR /app

# Install dependencies from root context
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy backend source code
COPY backend/ .

# Expose server port
EXPOSE 8000

# Set environment variables
ENV FLASK_ENV=production
ENV PYTHONUNBUFFERED=1

CMD ["python", "app.py"]
