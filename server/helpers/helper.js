const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class Helper {
	static getHashedPassword(plainPassword) {
		return new Promise((resolve, reject) => {
			const saltRounds = 10;

			bcrypt.hash(plainPassword, saltRounds).then(function(hash) {
				resolve(hash)
			}).catch(err => reject(err));
		});
	}

	static comparePassword(inputPassword, storedPassword) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(inputPassword, storedPassword).then(function(result) {
				if (result) {
					resolve(result)
				} else {
					reject(result);
				}
			}).catch(err => reject(err));
		});
	}

	static signWebToken(data) {
		return new Promise((resolve, reject) => {
			jwt.sign(
				data, process.env.JWT_SECRET,
				(err, token) => {
					if (err) {
						reject(err);
					} else {
						resolve(token)
					}
				}
			);
		});
	}

	static getVerifiedUserId (data)  {
		if (typeof data.id !== 'undefined' && data.id !== null) {
			return data.id;
		} else {
			return data._id;
		}
	}

	static findDeselectedItem(CurrentArray, PreviousArray) {
		var CurrentArrSize = CurrentArray.length;
		var PreviousArrSize = PreviousArray.length;

   // loop through previous array
   for(var j = 0; j < PreviousArrSize; j++) {
      // look for same thing in new array
      if (CurrentArray.indexOf(PreviousArray[j]) == -1)
      	return PreviousArray[j];
    }

    return null;
  }
}

module.exports = Helper;