
/**
 * Class to contain methods related to the editors.
 */
class EditorInput {

    /**
     * Initalises the editor.
     * 
     * @param {String} elementId the editor to initalise
     */
    static initalise(elementId) {
        EditorInput._setFontSize(elementId, 12);
    }

    /**
     * Returns the textarea element object from the editor.
     * 
     * @param {String} editorId the id of the editor
     * @returns {HTMLElement} the textarea element from within the editor
     */
    static getInput(editorId) {
        return EditorInput._getChild(editorId, "input");
    }

    /**
     * Returns the code element object from the editor.
     * 
     * @param {String} editorId the id of the editor
     * @returns {HTMLElement} the code element from within the editor
     */
    static getHighlighted(editorId) {
        return EditorInput._getChild(editorId, "highlighted");
    }

    /**
     * Updates the content of the highlighted input in the code element from the textarea element.
     * 
     * @param {String} input the textarea element that calls the method
     */
    static update(input) {
        var content = input.value;

        if (content[content.length - 1] == "\n") { // If the last character is a newline character
            content += " "; // Add a placeholder space character to the final line
        }
        content = EditorInput._escapeHtml(content);

        var hightlighted = EditorInput._findElementWithId(input.parentNode.children, "highlighted");

        var mapping = SyntaxHighlighter.getMapping(input.parentNode.id);

        content = SyntaxHighlighter.highlight(content, mapping);
        
        hightlighted.innerHTML = content;
    }

    /**
     * Returns the raw input to the editor.
     * 
     * @param {String} editorId the editor ID to get the value from
     * @returns {String} the textarea value
     */
    static getValue(editorId) {
        var editor = EditorInput.getInput(editorId);
        return editor.value;
    }

    /**
     * Sets the editor input.
     * 
     * @param {String} editorId the editor ID to set the value for
     * @param {String} value the value
     */
    static setValue(editorId, value) {
        var editor = EditorInput.getInput(editorId);
        editor.value = value;
        EditorInput.update(EditorInput.getInput(editorId));
    }

    /**
     * Resets the editor.
     * 
     * @param {String} editorId the id of the editor to reset
     */
    static reset(editorId) {
        EditorInput.getInput(editorId).value = "";
        EditorInput.getHighlighted(editorId).innerHTML = "";
    }

    /**
     * Syncs the scrolling of the input and the highlighted elements.
     * 
     * @param {HTMLElement} input the input element
     */
    static scroll(input) {
        /* Scroll result to scroll coords of event - sync with textarea */
        let highlighted = EditorInput._findElementWithId(input.parentNode.children, "highlighted");
        // Get and set x and y
        highlighted.scrollTop = input.scrollTop;
        highlighted.scrollLeft = input.scrollLeft;
    }

    /**
     * Handles the pressing of the tab key, intercepting the normal 'focus on next input' function.
     * 
     * @param {HTMLElement} element the input element
     * @param {Event} event the key down event
     */
    static tabHandler(element, event) {
        let code = element.value;
        if (event.key == "Tab") {
            /* Tab key pressed */
            event.preventDefault(); // stop normal
            let before_tab = code.slice(0, element.selectionStart); // text before tab
            let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
            let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
            element.value = before_tab + "\t" + after_tab;
            // add tab char
            // move cursor
            element.selectionStart = cursor_pos;
            element.selectionEnd = cursor_pos;
            EditorInput.update(element); // Update text to include indent
        }
    }

    /**
     * Increases the font size in the editor.
     * 
     * @param {String} elementId the editor to change the font size of
     */
    static increaseFontSize(elementId) {
        EditorInput._changeFontSize(elementId, 2);
    }

    /**
     * Decreases the font size in the editor.
     * 
     * @param {String} elementId the editor to change the font size of
     */
    static decreaseFontSize(elementId) {
        EditorInput._changeFontSize(elementId, -2);
    }

    /**
     * Changes the font size in the given editor by the given amount.
     * 
     * @param {String} elementId the editor to change
     * @param {Number} delta the difference to change the font by
     */
    static _changeFontSize(elementId, delta) {
        var current = parseInt(EditorInput.getInput(elementId).style.fontSize);
        EditorInput._setFontSize(elementId, current + delta);
    }

    /**
     * Sets the font size in the input and highlighted elements.
     * 
     * @param {String} elementId the editor to set the font size in
     * @param {number} size the new font size
     */
    static _setFontSize(elementId, size) {
        EditorInput.getInput(elementId).style.fontSize = size + "px";
        EditorInput.getHighlighted(elementId).style.fontSize = size + "px";
    }


    /**
     * Downloads the editor console to a file
     * 
     * @param {String} editorId the id of the editor to download
     * @param {String} filename the filename to use for the download
     */
    static download(editortId, filename) {
        var content = EditorInput.getValue(editortId);
        const link = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    }


    // Methods to get the input and the highlighted elements from the editor id

    /**
     * Returns the child from the given element with the id.
     * 
     * @param {String} elementId the element to search in
     * @param {String} id the id of the element to find
     * @returns {HTMLElement} the element
     */
    static _getChild(elementId, id) {
        Debugger.log("Getting child with ID '" + id + "' from '" + elementId + "'");
        var element = document.getElementById(elementId);
        return EditorInput._findElementWithId(element.children, id);
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
