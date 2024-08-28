import os 
 
class Settings: 
PROJECT_NAME: str = "AuthMe" 
API_V1_STR: str = "/api/v1" 
SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key") 
ALGORITHM: str = "HS256" 
ACCESS_TOKEN_EXPIRE_MINUTES: int = 30 
 
settings = Settings() 
