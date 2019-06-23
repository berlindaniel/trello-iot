# trello-iot

This AWS lambda function utilizes the Trello API to add new cards to any board at the press of an internet-connected button.
It will also send a text message to the designated phone number, notifying the user of the event.

# Dependencies

  * trello `npm install trello` (node package for Trello API)
  * aws-cli `npm install aws-cli` (command line interface for AWS)
