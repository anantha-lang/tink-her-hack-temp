import sys
import os

# Add the repo root to path so Python can find the 'backend' module
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.main import app

# This is the entry point for Vercel
# Vercel will look for 'app' in this file
