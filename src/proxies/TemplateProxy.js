import Proxy from './Proxy';

class TemplateProxy extends Proxy {
    /**
     * The constructor for the TemplateProxy
     *
     * @param {Object} parameters The query parameters
     */
    constructor(parameters = {}) {
        super('templates', parameters);
    }
}

export default TemplateProxy;
