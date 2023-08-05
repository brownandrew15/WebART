
/**
 * Class to control modal elements created using the dialog element.
 */
class Modal {

    /**
     * Shows the modal view.
     * 
     * @param {String} modalId the id of the modal to show
     */
    static show(modalId) {
        document.getElementById(modalId).showModal();

    }

    /**
     * Closes the modal view.
     * 
     * @param {String} modalId the id of the modal to close
     */
    static close(modalId) {
        document.getElementById(modalId).close();
    }



}