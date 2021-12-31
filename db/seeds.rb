# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

Tee.destroy_all
Player.destroy_all
Scorecard.destroy_all
Course.destroy_all

courses = Course.create([
    {
      name: "Falcon Crest",
      par: [4,5,4,4,3,5,4,3,4, 3,5,4,3,4,4,5,4,4]
    },
    {
      name: "Spurwing",
      par: [4,5,4,4,5,3,4,4,3, 4,4,3,5,4,3,5,4,4]
    },
    {
      name: "TimberStone",
      par: [4,4,4,5,4,3,5,3,4, 4,4,5,3,5,4,4,3,4]
    }
  ])

tees = Tee.create(
  [
    {
     name: "Championship",
     yardages: [370,525,413,425,208,560,414,210,320, 204,494,360,202,420,443,570,435,456],
     course: courses.first,
     order_number: 1
   },
   {
     name: "Forward",
     yardages: [316,512,370,371,168,500,375,170,300, 180,455,315,178,380,382,523,400,414],
     course: courses.first,
     order_number: 2
   },
   {
     name: "Black",
     yardages: [375,541,421,443,569,197,500,385,176, 488,405,217,581,411,186,605,318,400],
     course: courses.second,
     order_number: 1
   },
    {
      name: "Blue",
      yardages: [350,513,401,423,529,171,477,345,156, 439,385,176,561,392,160,572,300,371],
      course: courses.second,
      order_number: 2
    },
    {
      name: "Tournament",
      yardages: [400,425,364,500,318,220,543,177,433, 402,348,591,222,530,410,423,243,399],
      course: courses.third,
      order_number: 1
    },
    {
      name: "Casual",
      yardages: [350,400,337,466,280,190,510,151,400, 375,318,551,173,495,390,395,223,369],
      course: courses.third,
      order_number: 2
    }
  ])

scorecards = Scorecard.create([
  {
    course: courses.first,
    card_name: "Sample Card",
    players: [
      Player.new(
        name: "Tiger",
        scores: [3,4,4,4,3,4,4,3,3, 3,4,3,3,4,4,4,4,4]
      ),
      Player.new(
        name: "Phil",
        scores: [3,4,4,4,4,3,5,3,4, 2,4,3,3,3,4,5,4,4]
      )
    ]
  }
])
