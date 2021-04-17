/* ============
 * Mutations for the report module
 * ============
 *
 * The mutations that are available on the
 * report module.
 */

import {
    FIND,
    UPDATE,
    UPDATEPARENT,
    REMOVE,
    IGNORE_CHANGES,
    STORE_TEMPCELL,
} from './mutation-types';
import NumberUtil from '@/utils/NumberUtil.js';

function updateParentCell(cell) {
    /**
     * should check whether it is leat or node
     */
    if (cell.wholeEnabled === false || cell.enabled === false) {
        return;
    }

    let childTotalCostSum;
    if (cell.childLines != null && cell.childLines.length > 0) {
        childTotalCostSum = 0.0;
    } else {
        childTotalCostSum = NumberUtil.parseCommaFloat(cell.totalCost).toFixed(
            2
        );
    }

    if (cell.childLines != null && cell.childLines.length > 0) {
        for (const childLine of cell.childLines) {
            childTotalCostSum += getTotalCost(childLine);
        }
    }

    cell.totalCost = NumberUtil.numberFormat(
        NumberUtil.parseCommaFloat(childTotalCostSum).toFixed(2)
    );
}

function getTotalCost(cell) {
    if (cell.wholeEnabled === false || cell.enabled === false) {
        return 0.0;
    }

    const selfTotalCost = NumberUtil.parseCommaFloat(cell.totalCost);
    let childTotalCostSum = 0.0;

    if (cell.childLines != null && cell.childLines.length > 0) {
        for (const childLine of cell.childLines) {
            childTotalCostSum += getTotalCost(childLine);
        }
    }

    return selfTotalCost + childTotalCostSum;
}

function updateChildrenStatus(cell, status) {
    cell.wholeEnabled = status;
    if (cell.childLines != null && cell.childLines.length > 0) {
        for (const childLine of cell.childLines) {
            updateChildrenStatus(childLine, status);
        }
    }
}

function initStatus(cell) {
    if (cell.selected === null || cell.selected === true) {
        cell.enabled = true;
        cell.wholeEnabled = true;
    } else {
        cell.enabled = cell.selected;
        cell.wholeEnabled = true;
    }

    // SET changed false when initializing
    cell.changed = false;

    cell.quantity = NumberUtil.numberFormat(
        NumberUtil.fixPoint(NumberUtil.parseCommaFloat(cell.quantity))
    );
    if (cell.materialCostPer) {
        cell.materialCostPer = NumberUtil.numberFormat(
            NumberUtil.fixPoint(
                NumberUtil.parseCommaFloat(cell.materialCostPer)
            )
        );
    } else {
        cell.materialCostPer = 0;
    }

    if (cell.laborCostPer) {
        cell.laborCostPer = NumberUtil.numberFormat(
            NumberUtil.fixPoint(NumberUtil.parseCommaFloat(cell.laborCostPer))
        );
    } else {
        cell.laborCostPer = 0;
    }

    if (cell.subcontractorCostPer) {
        cell.subcontractorCostPer = NumberUtil.numberFormat(
            NumberUtil.fixPoint(
                NumberUtil.parseCommaFloat(cell.subcontractorCostPer)
            )
        );
    } else {
        cell.subcontractorCostPer = 0;
    }

    if (cell.equipmentCostPer) {
        cell.equipmentCostPer = NumberUtil.numberFormat(
            NumberUtil.fixPoint(
                NumberUtil.parseCommaFloat(cell.equipmentCostPer)
            )
        );
    } else {
        cell.equipmentCostPer = 0;
    }

    cell.totalCost = NumberUtil.numberFormat(
        NumberUtil.fixPoint(NumberUtil.parseCommaFloat(cell.totalCost))
    );

    if (cell.childLines != null && cell.childLines.length > 0) {
        for (const childLine of cell.childLines) {
            initStatus(childLine);
        }
    }
}

function removeCell(project, cell) {
    if (project.lines != null && project.lines.length > 0) {
        for (let i = 0; i < project.lines.length; i++) {
            if (project.lines[i].estimateLineId != null) {
                if (project.lines[i].estimateLineId === cell.estimateLineId) {
                    project.lines.splice(i, 1);

                    return;
                }
            } else if (
                project.lines[i].code === cell.code &&
                project.lines[i].count === cell.count
            ) {
                project.lines.splice(i, 1);

                return;
            }
        }

        for (let i = 0; i < project.lines.length; i++) {
            removeChildCell(project.lines[i], cell);
        }
    }
}

function removeChildCell(parentCell, childCell) {
    if (parentCell.childLines != null && parentCell.childLines.length > 0) {
        for (let i = 0; i < parentCell.childLines.length; i++) {
            if (parentCell.childLines[i].estimateLineId != null) {
                if (
                    parentCell.childLines[i].estimateLineId ===
                    childCell.estimateLineId
                ) {
                    parentCell.childLines.splice(i, 1);

                    return;
                }
            } else if (
                parentCell.childLines[i].code === childCell.code &&
                parentCell.childLines[i].count === childCell.count
            ) {
                parentCell.childLines.splice(i, 1);

                return;
            }
        }
    }
}

/* eslint-disable no-param-reassign */
export default {
    [FIND](state, project) {
        state.project = project;
        if (state.project.narrative != null && state.project.narrative !== '') {
            state.project.narrative = state.project.narrative.replace(
                /\n/g,
                '<br />'
            );
        }

        if (state.project.lines != null && state.project.lines.length > 0) {
            for (const line of state.project.lines) {
                initStatus(line);
            }
        }
    },
    [UPDATE](state, cell) {
        // SET changed true when changing
        cell.changed = true;
        updateChildrenStatus(cell, cell.wholeEnabled);
        updateParentCell(cell);
    },
    [UPDATEPARENT](state, cell) {
        updateParentCell(cell);
    },
    [REMOVE](state, cell) {
        removeCell(state.project, cell);
    },
    [IGNORE_CHANGES](state) {
        if (state.project.lines != null && state.project.lines.length > 0) {
            for (const line of state.project.lines) {
                initStatus(line);
            }
        }
    },
};
