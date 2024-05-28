const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("devuelve una lista de cafes", async () => {
        const response = await request(server).get("/cafes").send();
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it("Eliminar un cafe con id inexistente", async () => {
        const token= "token"
        const response = await request(server)
            .delete("/cafes/1234")
            .set("Authorization", token)
            .send();
        expect(response.statusCode).toBe(404);

    });

    it(" Agrega un cafe", async () => { 
        const newCafe={
            id:1234,
            nombre:"Cafe 1234"
        }
        const response = await request(server)
            .post("/cafes")
            .send(newCafe)
        expect(response.statusCode).toBe(201);
        expect(response.body).toContainEqual(newCafe);
    });

    it ("Actualiza un cafe", async () => {
        const id=1234
        const newCafe={
            id:5234,
            nombre:"Cafe 1234"
        }
        const response= await request(server)
            .put(`/cafes/${id}`)
            .send(newCafe)
        expect(response.statusCode).toBe(400);
    })
});
