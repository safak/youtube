const faker = require("faker");
const fs = require("fs");
let fakeData = {},
  categories = [],
  portfolios = [],
  works = [],
  testimonials = [];
const string =
  "https://images.unsplash.com/photo-1625301900900-b1bad2a914b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1625820951758-2e7461ff58fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1626274891801-a07c2adab0d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1624220425388-b45204759872?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1571327352610-1c5484ccc840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1589111487049-028898f487e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1626033121423-c1a82ba72da0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1626196874981-40349a369168?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1624385688831-7fda265c5d3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1624569742307-2dcc2caa0207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1624546409324-adaea0449c58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1625631978414-cce4a3ca61aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1624125277571-4061ca2654be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1625285049426-5dbed0167ea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1624388620826-5700d9952a4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1625708883692-1ccf4fc4a8d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1625946895451-40af0e9156ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1624247243614-3b677b1dc08e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1624261797054-0d3f372ced52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1625880279158-0c7b195548e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1549927681-a80cfd9c60fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1625304388844-c29bc011cdfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1625573555991-32fa9f6bc89f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1624704601995-7203c4f36633?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1624601572998-644f0a3b5b9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1623860480677-86f4c2bc3a76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1623887669107-50ae3e07d6bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1625653359777-4c378b8f4374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1624668430039-0175a0fbf006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080,https://images.unsplash.com/photo-1591234835481-6017a62016c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyNDU0NzF8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjY2MDY0MTY&ixlib=rb-1.2.1&q=80&w=1080";
const imgURL = string.split(",");

for (let x = 0; x < 5; x++) {
  categories.push(faker.name.jobArea());
}
let totalCount = 0;
for (let j = 0; j < categories.length; j++) {
  for (let i = 0; i < 6; i++) {
    const item = {
      id: faker.datatype.uuid(),
      category: categories[j],
      title: faker.name.jobArea(),
      imgURL: imgURL[totalCount],
      description: faker.random.words(7),
    };
    portfolios.push(item);
    totalCount++;
  }
}
for (let y = 0; y < 10; y++) {
  const item = {
    id: faker.datatype.uuid(),
    title: faker.name.jobArea(),
    description: faker.random.words(7),
    imgURL: y + ".png",
    icon: "icon" + y + ".png",
    color: faker.internet.color(),
  };
  works.push(item);
}
// ...testimonials
fakeData = { portfolios: [...portfolios], works: [...works] };
fs.writeFile("data.json", JSON.stringify(fakeData), (err) => {
  err && console.error(err);
  console.log("ok", categories);
});
