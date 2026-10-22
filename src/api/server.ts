import { createServer, Model, Response } from "miragejs";
import firstImage from "../assets/images/1.webp";
import secondImage from "../assets/images/2.webp";
import thirdImage from "../assets/images/3.webp";
import fourthImage from "../assets/images/4.webp";
import fifthImage from "../assets/images/5.webp";
import sixthImage from "../assets/images/6.webp";
import seventhImage from "../assets/images/7.webp";

createServer({
  models: {
    book: Model,
  },
  seeds(server) {
    // @ts-ignore
    server.create("book", {
      id: "1",
      title: "Harry Potter and the Philosopher's Stone",
      author: "J.K. Rowling",
      price: 12,
      condition: "good",
      description:
        "Harry Potter discovers he is a wizard and begins his first year at Hogwarts School of Witchcraft and Wizardry.",
      imageUrl: firstImage,
      type: "buy",
      hostId: "123",
    });

    // @ts-ignore
    server.create("book", {
      id: "2",
      title: "Harry Potter and the Chamber of Secrets",
      author: "J.K. Rowling",
      price: 0,
      condition: "worn",
      description:
        "Harry returns to Hogwarts where a mysterious chamber has been opened, putting students in danger.",
      imageUrl: secondImage,
      type: "borrow",
      hostId: "123",
    });

    // @ts-ignore
    server.create("book", {
      id: "3",
      title: "Harry Potter and the Prisoner of Azkaban",
      author: "J.K. Rowling",
      price: 0,
      condition: "like new",
      description:
        "Harry learns the truth about Sirius Black and uncovers secrets from his parents' past.",
      imageUrl: thirdImage,
      type: "gift",
      hostId: "456",
    });

    // @ts-ignore
    server.create("book", {
      id: "4",
      title: "Harry Potter and the Goblet of Fire",
      author: "J.K. Rowling",
      price: 18,
      condition: "new",
      description:
        "Harry is unexpectedly entered into the dangerous Triwizard Tournament.",
      imageUrl: fourthImage,
      type: "buy",
      hostId: "789",
    });

    // @ts-ignore
    server.create("book", {
      id: "5",
      title: "Harry Potter and the Order of the Phoenix",
      author: "J.K. Rowling",
      price: 0,
      condition: "good",
      description:
        "Harry forms Dumbledore's Army while the Ministry refuses to believe Voldemort has returned.",
      imageUrl: fifthImage,
      type: "borrow",
      hostId: "789",
    });

    // @ts-ignore
    server.create("book", {
      id: "6",
      title: "Harry Potter and the Half-Blood Prince",
      author: "J.K. Rowling",
      price: 9,
      condition: "good",
      description:
        "Dumbledore prepares Harry for the final battle by revealing Voldemort's past.",
      imageUrl: sixthImage,
      type: "buy",
      hostId: "123",
    });

    // @ts-ignore
    server.create("book", {
      id: "7",
      title: "Harry Potter and the Deathly Hallows",
      author: "J.K. Rowling",
      price: 20,
      condition: "new",
      description:
        "Harry, Ron, and Hermione set out to destroy Voldemort's Horcruxes in the final installment.",
      imageUrl: seventhImage,
      type: "buy",
      hostId: "123",
    });
  },

  routes() {
    this.namespace = "api";
    this.logging = false;
    this.timing = 2000;

    this.get("/books", (schema) => {
      // return new Response(400, {}, { error: "Error fetching data" });
      return schema.all("book");
    });

    this.get("/books/:id", (schema, request) => {
      return schema.find("book", request.params.id);
    });

    this.get("/host/books", (schema, request) => {
      // Hard-code the hostId for now
      // @ts-ignore
      return schema.where("book", { hostId: "123" });
    });

    this.get("/host/books/:id", (schema, request) => {
      // Hard-code the hostId for now
      const id = request.params.id;
      // @ts-ignore
      return schema.where("book", { id, hostId: "123" });
    });
  },
});
