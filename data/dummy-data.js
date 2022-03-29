import Project from "../models/project";

export const PROJECTS = [
  {
    id: "80c7d423-b265-4592-8049-5865508816d3",
    userId: "u1",
    city: "Douala",
    imageUrl:
      "https://media.istockphoto.com/photos/cappadocia-turkey-picture-id483421687",
    price: "$1595.78",
    description: "Nonsp positive cult NEC",
  },
  {
    id: "64ed1b49-2203-49ed-a9d5-842ffbbb00a7",
    userId: "u1",
    city: "Yaounde",
    imageUrl:
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    price: "$1595.89",
    description: "Lipodystrophy",
  },
  {
    id: "46bdca44-4318-4cc5-8994-1fc74c2a6d6c",
    userId: "u1",
    city: "Bafoussam",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    price: "$1493.29",
    description: "Univrsl ulcertve colitis",
  },
  {
    id: "a869d4a2-d603-451e-ba88-a36cdce9b914",
    userId: "u2",
    city: "Buea",
    imageUrl:
      "https://images.unsplash.com/photo-1579616075377-696d66a6e373?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cGxhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    price: "$1549.63",
    description: "Cryst arthrop NOS-ankle",
  },
  {
    id: "c0767461-1490-460d-a861-531ccffab966",
    userId: "u2",
    city: "Limbe",
    imageUrl:
      "https://images.unsplash.com/photo-1471306224500-6d0d218be372?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8cGxhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
    price: "$1726.41",
    description: "Brain hem NEC w opn wnd",
  },
  {
    id: "e5be34ed-e636-4dd4-b4bd-4704575d9ef9",
    userId: "u1",
    city: "Garoua",
    imageUrl:
      "https://images.unsplash.com/photo-1552903023-dc7b4c9fa5bf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: "$871.21",
    description: "No vaccination-pt refuse",
  },
  {
    id: "b1921eb2-3543-46c0-abaa-b7e05d67a656",
    userId: "u4",
    city: "Chicago",
    imageUrl:
      "https://images.unsplash.com/photo-1575036578784-094bf35ecff9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: "$1535.57",
    description: "Tox eff hydrocyan acd gs",
  },
  {
    id: "5973735c-66a9-490e-9680-c448ccd5d7ae",
    userId: "u3",
    city: "Los Angeles",
    imageUrl:
      "https://images.unsplash.com/photo-1603191738946-db80fb108997?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: "$539.35",
    description: "Dis amino-acid metab NOS",
  },
  {
    id: "a124bb2a-a70f-4441-b240-e01968888c72",
    userId: "u2",
    city: "Dubai",
    imageUrl:
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: "$1905.94",
    description: "Stress react, psychomot",
  },
  {
    id: "33000201-ff1e-4442-96b8-d63d60099b19",
    userId: "u1",
    city: "Maroua",
    imageUrl:
      "https://images.unsplash.com/photo-1574509322729-fdbcea67df6f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description: "Mal neo pancreas head",
  },
  {
    id: "e35ef224-5655-4f58-9195-fb1aab154e67",
    userId: "u5",
    city: "Kaishantun",
    imageUrl:
      "https://images.unsplash.com/photo-1624193931159-eb1b0817c2d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: "$1326.08",
    description: "Bone donor",
  },
  {
    id: "d17e6b56-7cf8-44b3-832a-93e2cc7f77f1",
    city: "Liugong",
    imageUrl: "http://dummyimage.com/154x100.png/5fa2dd/ffffff",
    price: "$1423.05",
    description: "Essen hyperten-del w p/p",
  },
  {
    id: "11c53d0d-beb6-4d8b-8fbf-008089301d8a",
    city: "Qingshui",
    imageUrl: "http://dummyimage.com/244x100.png/5fa2dd/ffffff",
    price: "$1560.37",
    description: "Prim TB pleurisy-unspec",
  },
  {
    id: "465d8808-6b6c-44b8-93b4-e4353e6f5342",
    city: "Wuqiao",
    imageUrl:
      "https://images.unsplash.com/photo-1583928132464-1441d0d7319d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjZ8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: "$1071.86",
    description: "Contusion shoulder & arm",
  },
  {
    id: "79437878-a4ce-4c4c-a5b4-88a521054903",
    city: "Březová",
    imageUrl:
      "https://images.unsplash.com/photo-1505159940484-eb2b9f2588e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: "$1005.70",
    description: "Cortical senile cataract",
  },
  {
    id: "c44edd1e-6554-4b14-9e8d-a337167d0e33",
    userId: "u4",
    city: "Kivsharivka",
    imageUrl:
      "https://images.unsplash.com/photo-1613402900762-25b427ea5d45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: "$1229.35",
    description: "Speech del d/t hear loss",
  },
  {
    id: "307f36f1-f179-49e9-a1b4-d4436a594af0",
    userId: "u4",
    city: "Itsandra",
    imageUrl:
      "https://images.unsplash.com/photo-1513010072333-792fcc02ee7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: "$1987.78",
    description: "Ac mono leu wo achv rmsn",
  },
  {
    id: "d4dcc589-5a3e-45c0-92b0-e3ac8fc71329",
    userId: "u5",
    city: "Zhantang",
    imageUrl:
      "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: "$752.45",
    description: "Fetal malnutrition wtNOS",
  },
  {
    id: "91f92acb-be93-46dd-8875-b76ff7ca018b",
    userId: "u1",
    city: "Buenavista",
    imageUrl:
      "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: "$916.57",
    description: "TB fem gen NEC-micro dx",
  },
  {
    id: "876f4951-9800-4082-9c27-be10930c26ed",
    userId: "u5",
    city: "Mizusawa",
    imageUrl:
      "https://images.unsplash.com/photo-1432958576632-8a39f6b97dc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NDJ8fHBsYWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    price: "$598.17",
    description: "Stiff-man syndrome",
  },
];
