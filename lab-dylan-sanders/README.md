Express single resource API

To start clone the repo and from the directory run: 
`npm i` to install dependencies

Next run one of the following to start the server:
`nodemon server.js` or 
`node server.js`

Then make requests with the terminal, httpie or postman is recommended
Httpie usage
To add a new song: 
`http POST :3000/api/music/  artist=theArtist song=theSong`

To get access music in your collection:
`http GET :3000/api/music/:id` with the corresponding music Id where `:id` is

To update music in your collection:
`http PUT :3000/api/music/:id artist=updatedArtist song=updatedSong`

To delete music from your collection:
`http DELETE :3000/api/music/:id`

To test:
`mocha`

To test and lint:
`gulp`