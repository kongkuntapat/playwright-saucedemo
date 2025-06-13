// tests/api.spec.ts
import { test, expect } from '@playwright/test';

// เปลี่ยนชื่อ Describe เพื่อให้สอดคล้องกับ API ใหม่
test.describe('JSONPlaceholder API Testing', () => {

  // เทสเคสที่ 1: ทดสอบ GET request เพื่อดึงข้อมูล "post" ที่มี id = 1
  test('GET - should get a post successfully', async ({ request }) => {
    // endpoint ของ API ใหม่คือ /posts/:id
    const response = await request.get('/posts/1');

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    console.log('GET Response Body:', body);

    // ตรวจสอบข้อมูลใน Response body ตามโครงสร้างของ JSONPlaceholder
    expect(body.userId).toBe(1);
    expect(body.id).toBe(1);
    expect(body).toHaveProperty('title');
    expect(body).toHaveProperty('body');
  });

  // เทสเคสที่ 2: ทดสอบ POST request เพื่อสร้าง "post" ใหม่
  test('POST - should create a new post', async ({ request }) => {
    const newPost = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    // endpoint ของ API ใหม่คือ /posts
    const response = await request.post('/posts', {
      data: newPost,
    });

    // JSONPlaceholder จะตอบกลับ 201 Created สำหรับการ POST
    expect(response.status()).toBe(201);

    const body = await response.json();
    console.log('POST Response Body:', body);

    // ตรวจสอบว่าข้อมูลที่ส่งไป อยู่ใน response ที่ตอบกลับมา
    expect(body.title).toBe(newPost.title);
    expect(body.body).toBe(newPost.body);
    expect(body.userId).toBe(newPost.userId);
    expect(body).toHaveProperty('id'); // ตรวจสอบว่า API สร้าง id ให้เรา
  });
});