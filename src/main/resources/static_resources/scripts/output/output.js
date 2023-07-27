
/**
 * Class to manage the output console.
 */
class Output {


    static initalise(outputId) {
        Output._setFontSize(outputId, 12);
    }

    /**
     * Adds a single line to the console, appends a new line.
     * 
     * @param {String} outputId the output to append the line to
     * @param {String} line the content to append to the output
     */
    static addLine(outputId, line) {
        Debugger.log("Adding line: " + line);
        var content = Output._getOutputContent(outputId);
        content.innerHTML += Output._escapeHtml(line) + "\n";
        Output.scrollToBottom(outputId);
    }

    /**
     * Appends multiple lines to the console.
     * 
     * @param {String} outputId the output to append to
     * @param {Array} lines the lines to append
     */
    static addLines(outputId, lines) {
        Debugger.log("Adding lines: " + lines);
        for (var i=0; i<lines.length; i++) {
            Output.addLine(outputId, lines[i])
        }
    }

    /**
     * Clears the output console.
     * 
     * @param {String} outputId the output to clear
     */
    static clear(outputId) {
        Debugger.log("Clearing output console");
        Output._getOutputContent(outputId).innerHTML = "";
    }

    /**
     * Scrolls the output to the last line that was appended.
     * 
     * @param {String} outputId the output to scroll
     */
    static scrollToBottom(outputId) {
        var output = document.getElementById(outputId);
        output.scrollTop = output.scrollHeight;
    }

    /**
     * Prints a seperator between the previous execution and the next.
     * Includes the date and time of the execution.
     * 
     * @param {String} outputId the output start
     */
    static startNewOutput(outputId) {
        var timestamp = new Date().toLocaleString();
        Output.addLine(outputId, "");
        Output.addLine(outputId, "Execution at " + timestamp + ":");

    }



    /**
     * Increases the font size in the output.
     * 
     * @param {String} outputId the output to change the font size of
     */
    static increaseFontSize(outputId) {
        Output._changeFontSize(outputId, 2);
    }

    /**
     * Decreases the font size in the output.
     * 
     * @param {String} outputId the output to change the font size of
     */
    static decreaseFontSize(outputId) {
        Output._changeFontSize(outputId, -2);
    }

    /**
     * Changes the font size in the output by the given amount.
     * 
     * @param {String} outputId the output to change
     * @param {Number} delta the difference to change the font by
     */
    static _changeFontSize(outputId, delta) {
        var current = parseInt(Output._getOutputContent(outputId).style.fontSize);
        Output._setFontSize(outputId, current + delta);
    }

    /**
     * Sets the font size in the output.
     * 
     * @param {String} outputId the output to set the font size in
     * @param {number} size the new font size
     */
    static _setFontSize(outputId, size) {
        Output._getOutputContent(outputId).style.fontSize = size + "px";
    }


    /**
     * Downloads the output console to a file called output.txt.
     * 
     * @param {String} outputId the id of the output to download
     */
    static download(outputId) {
        var content = Output._getOutputContent(outputId).innerText;
        const link = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = "output.txt";
        link.click();
        URL.revokeObjectURL(link.href);
    }


    /**
     * Returns the content element for the output.
     * 
     * @param {String} outputId the output containing the content
     * @returns {HTMLElement} the content element
     */
    static _getOutputContent(outputId){
        var output = document.getElementById(outputId);
        return Output._findElementWithId(output.children, "content");
    }


    /**
     * Returns the child from the given element with the id.
     * 
     * @param {HTMLCollection} elements the elements to search in
     * @param {String} id the id of the element to find
     * @returns {HTMLElement} the element
     */
    static _findElementWithId(elements, id) {
        var i = 0;
        while (!(elements[i].id == id)) {
            Debugger.log("Current element is a " + elements[i] + " and has id " + elements[i].id);
            i++;
        }
        return elements[i];
    };

    /**
     * Escapes HTML in a string.
     * 
     * @param {String} unsafe the string to escape
     * @returns {String} the escaped string
     */
    static _escapeHtml(unsafe) {
        return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    }



}