
/**
 * Class to handle API requests.
 */
class APIRequest {


    /**
     * Gets data from a URL.
     * 
     * @param {String} url the URL to send the request to
     * @param {Function} successCallback The function to run on success - accepts a single parameter that is the returned JSON data
     * @param {Function} failureCallback The function to run on failure - accecpts no parameters
     */
    static get(
        url,
        successCallback = (data) => {},
        failureCallback = () => {}
    ) {
        APIRequest._generateGetFetch(url)
            .then(data => {
                successCallback(data);
            })
            .catch(err => {
                // log the error to the console
                Debugger.log("Call to " + url + " retured an error:\n" + err);
                // run the failure callback
                failureCallback();
            });
    }


    /**
     * Posts data to a URL.
     * 
     * @param {Array<String>} url the URLs to send the request to
     * @param {Function} successCallback The function to run on success - accepts a single parameter that is the returned JSON data for each of the URLs
     * @param {Function} failureCallback The function to run on failure - accecpts no parameters
     * @param {Function} afterCallBack The function to run after all the URL requests - accepts no parameters
     */
    static getAll(
        urls,
        successCallback = (data) => {},
        failureCallback = () => {},
        afterCallBack = () => {}
    ) {
        // create the array of fetch requests
        let promiseArray = [];
        urls.forEach(url => {
            promiseArray.push(
                APIRequest._generateGetFetch(url)
            );
        });

        // process the promises
        Promise.all(promiseArray)
            .then(responses => {
                responses.map(data => {
                    successCallback(data); // call the success callback
                });          
            })
            .then(function() {
                afterCallBack(); // callback for after all responses have been processed
            })
            .catch(err => {
                // log the error to the console
                Debugger.log("Call to " + url + " retured an error:\n" + err);
                // run the failure callback
                failureCallback();
            });
    }


    /**
     * Posts data to a URL.
     * 
     * @param {String} url the URL to send the request to
     * @param {JSON} data the data to send
     * @param {Function} successCallback The function to run on success - accepts a single parameter that is the returned JSON data
     * @param {Function} failureCallback The function to run on failure - accecpts no parameters
     */
    static post(
        url,
        data,
        successCallback = (data) => {},
        failureCallback = () => {}
    ) {
        APIRequest._generatePostFetch(url, data)
            .then(recievedData => {
                successCallback(recievedData);
            })
            .catch(err => {
                // log the error to the console
                Debugger.log("Call to " + url + " retured an error:\n" + err);
                // run the failure callback
                failureCallback();
            });
    }



    /**
     * Generates a GET request to a URL.
     * 
     * @param {String} url the URL to send the GET request to
     * @returns {Promise<JSON>} the JSON data returned from the GET request
     */
    static _generateGetFetch(url) {
        const encodedURL = encodeURI(url);
        return fetch(encodedURL)
            .then(APIRequest._checkStatus)
            .then(response => response.json())
            .then(data => {
                Debugger.log("Call to " + url + " returned:\n" + JSON.stringify(data, null, 4));
                return data;
            });
    }


    /**
     * Generates a POST request to a given URL with JSON data.
     * 
     * @param {String} url the URL to send the POST request to
     * @param {JSON} data the data to send to the URL
     * @returns {Promise<JSON>} The JSON data returned from the POST request
     */
    static _generatePostFetch(url, data) {
        const encodedURL = encodeURI(url);
        return fetch(
            encodedURL, 
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(APIRequest._checkStatus)
            .then(response => response.json())
            .then(data => {
                Debugger.log("Call to " + url + " returned:\n" + JSON.stringify(data, null, 4));
                return data;
            });
    }




    /**
     * Checks the status of the response was ok and returns it, 
     * otherwise throws exception to trigger the fetch catch.
     * 
     * @param {Response} response the response from the fetch request
     * @returns {Response} the response
     * @throws {Error} if the status of the response was not ok
     */
     static _checkStatus(response) {
        if (!response.ok) {
            response.clone().json() // clone the response to convert to JSON again
                                    // if this is not done then JS produces an error
                .then(error => {
                    throw new Error(error.message);
                });
        }
        return response;
    }


}