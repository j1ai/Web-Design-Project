/*
 * HW1 API testing. You should implement following 3 functioins.
 * - getListsOfItems:
 * 	   Find a RESTFUL API and use GET to retrive a list of items.
 * - getOneItemById:
 *     Retrieve a single item by id based on the list you get from
 * 	   getListsOfItems().
 * - getOneAttributeFromItem:
 *     Return any attribute from the retrieved item.
 *     Ex: Return the temperature.
 */

const request = require('request')

API_KEY = 'vXTvfn2nefMuprAfim9GP9kRBEU4aN0v'


function getData(id) {
	/*
	 * Returns a list of items, one item of given ID, one attribute in the item of given id  from the API.
	 *
	 * @return three arrays of items
	 */
	request.get('https://cobalt.qas.im/api/1.0/exams'+'?key='+API_KEY, function (err,res, body) {
			if(err) {
			    console.log(err)
			} else {

			url = 'https://cobalt.qas.im/api/1.0/exams/'+id+'?key='+API_KEY
			request.get(url, function (err,res, body) {
	 			if(err) {
	 			 console.log(err)
	 			} else {
	 				//getListsOfItems
	 			 	//get all exam data related to courses
					//Get a single attribute from a given item. Return the exam date of the given exam.
	 			 	request.get('https://cobalt.qas.im/api/1.0/exams/'+id+'?key='+API_KEY, function (err,res, body) {
	 			 		 if(err) {
	 			 		 	console.log(err)
	 			 		 } else {
	 			 		 	//getOneAttributeFromItem
	 			 		 	//get the exam date for the given course
	 			 		 	data = JSON.parse(body)

							console.log(data.date)
	 			 			console.log('------------------------------------------------------------------------')
	 			 		}
	 			 	})
	 			 	//getOneItemById
					//get one specific exam info by courseID
	 			 	data2 = JSON.parse(body)
	 			 	console.log(data2)
					console.log('------------------------------------------------------------------------')
	 			}
	 		})

			data3 = JSON.parse(body)


			console.log(data3)
			console.log('------------------------------------------------------------------------')
			}
		  })
}


getData('ABS201Y1Y20149DEC15')
