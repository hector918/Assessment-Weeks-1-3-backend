// Import necessary modules and functions
const request = require('supertest');
const app = require('../app'); const fs = require('fs');

const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));

describe('GET /', () => {
  it('should respond with a JSON object containing "data: "Service is running!"', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ data: "Service is running!" });
  });
});

describe('GET /items', () => {
  it('should respond with a JSON object containing the "data" array', async () => {
    const response = await request(app).get('/items');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ data });
  });
});

describe('GET /item/:id', () => {
  it('should respond with a JSON object containing the correct item when a valid ID is provided', async () => {
    const response = await request(app).get('/item/1bae205e-12e5-465a-b2b2-f19ee8a123ca');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ data: {
      "id": "1bae205e-12e5-465a-b2b2-f19ee8a123ca",
      "name": "Mozarella Sticks",
      "price": 5.25,
      "image": "https://pursuit-pizza-images.s3.amazonaws.com/_e3bd4ff5-d037-4916-9ceb-3dced6045fcb.jpeg",
      "toppings": [],
      "tags": ["appetizer", "vegetarian"],
      "defaultOrder": 7,
      "shortDescription": "Cheesy goodness",
      "longDescription":
        "Mayo consectetur stuffed spinach sausage onions. Ut quis ut lasagna voluptate bacon & tomato elit enim pizza laboris garlic. Mayo aute thin crust broccoli. Stuffed crust hawaiian string cheese, pork black olives party non bbq rib extra sauce philly steak stuffed melted cheese aute spinach sausage. Tempor platter pizza roll, personal nisi exercitation id sunt dolore black olives mayo beef et."
    }});
  });

  it('should respond with a 404 status when an invalid ID is provided', async () => {
    const response = await request(app).get('/item/invalidId');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'Item not found.' });
  });
});

describe('GET 404', () => {
  it('should respond with a 404 status and an error message', async () => {
    const response = await request(app).get('/invalid-endpoint');
    expect(response.statusCode).toBe(404);
    expect(response.text).toContain('File not found.');
  });
});
