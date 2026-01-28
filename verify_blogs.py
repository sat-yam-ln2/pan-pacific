import requests
import json

BASE_URL = "http://localhost:5000/api"

def test_health():
    print("Testing Health Check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status: {response.status_code}")
        print(f"Content: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")

def test_get_blogs():
    print("\nTesting GET /api/blogs...")
    try:
        response = requests.get(f"{BASE_URL}/blogs?limit=5")
        print(f"Status: {response.status_code}")
        data = response.json()
        if data['success']:
            blogs = data['data']
            pagination = data['pagination']
            print(f"Found {len(blogs)} blogs")
            print(f"Total pagination count: {pagination['total']}")
            if len(blogs) > 0:
                print(f"First blog title: {blogs[0]['title']}")
                print(f"First blog slug: {blogs[0]['slug']}")
        else:
            print(f"Failed: {data.get('message')}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_health()
    test_get_blogs()
