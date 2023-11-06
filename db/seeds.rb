# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

User.create(username: "developer 1", email:"developer1@gmail.com", password:"qwer1234", role:0, story_point_capability: 2)
User.create(username: "developer 2", email:"developer2@gmail.com", password:"qwer1234", role:0, story_point_capability: 2)
User.create(username: "product manager 1", email:"pm1@gmail.com", password:"qwer1234", role:1, story_point_capability: 1)
