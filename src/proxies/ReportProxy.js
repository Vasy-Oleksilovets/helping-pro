import BaseProxy from './Proxy';

class ReportProxy extends BaseProxy {
    /**
     * The constructor for the ReportProxy.
     *
     * @param {Object} parameters The query parameters.
     */
    constructor(parameters = {}) {
        super('api/reports', parameters);
    }
}

export default ReportProxy;
