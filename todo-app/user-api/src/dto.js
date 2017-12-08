/**
 * @swagger
 * definitions:
 *     User:
 *         required:
 *             - email
 *             - firstName
 *             - lastName
 *         properties:
 *             email:
 *                 type: string
 *             firstName:
 *                 type: string
 *             lastName:
 *                 type: string
 */
class UserDTO {
    constructor({email, firstName, lastName}) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

module.exports = UserDTO;