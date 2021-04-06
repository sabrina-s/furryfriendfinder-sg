require("./db");
const Dog = require("../models/dog.model");

const createDogsPromise = () => {
  return Dog.create([
    {
      name: "Bernie",
      gender: "male",
      description: "He's chonky but lovable.",
      hdbApproved: true,
      image: "bernie.png",
    },
    {
      name: "Dobby",
      gender: "male",
      description: "Fiercely loyal.",
      hdbApproved: false,
      image: "",
    },
    {
      name: "Spangle",
      gender: "female",
      description:
        "Spangle has a very sweet and gentle disposition. Shy with strangers initially, she warms up fairly quickly and is affectionate once she knows you.",
      hdbApproved: true,
      image: "spangle.jpg",
    },
  ]);
};

const isDogsEmpty = async () => {
  const dogs = await Dog.find();
  return dogs.length === 0;
};

const seedDogs = async () => {
  try {
    if (await isDogsEmpty()) {
      await createDogsPromise();
      console.log("Seeded dog data!");
    } else {
      console.log("Did not seed data: dogs collection already seeded");
    }
  } catch (err) {
    console.log("Error seeding data... rolling back");
    await Dog.deleteMany();
    console.error(err);
  }
};

seedDogs();
