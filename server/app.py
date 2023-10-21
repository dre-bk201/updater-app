from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello there"}

@app.get("/releases")
async def release(arg, req):
    print(arg, req)
    return {"message": "Hello there"}


if __name__ == "__main__":
    uvicorn.run("main:release", port=8081, log_level="info")

