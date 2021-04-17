/* ============
 * Mutations for the project module
 * ============
 *
 * The mutations that are available on the
 * project module.
 */

import * as type from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [type.ALL_MASTER_CODES](state, response) {
    state.allCodes = response;
  },

  [type.MEASUREMENT](state, measurements) {
    state.measurements = measurements;
  },

  [type.ADD_NEW_ESTIMATE_LINE](state, payload) {
    // If the cell already exist, copy the value except children
    if (state.allInsertedCodeIds.includes(payload.cell.newId)) {
      findAndUpdateExceptChildren(state.estimateLines, payload.cell);
      return;
    }
    // Find parent hierarchy
    addNewEstimateLine(state, payload.cell);
  },

  [type.UPDATE_ESTIMATE_LINE](state, payload) {
    state.lineIdsByCodeNumber[payload.cell.newNumber] = payload.cell.estimateLineId;
    // Find the object by code id and replace with new data
    findAndUpdateChildren(
      state.estimateLines,
      payload.cell.newId,
      payload.cell
    );
  },

  [type.CALCULATE_CONSTRUCTION_CHECK](state) {
    // Calculate the parent's total with children's total
    reCalculateTotal(state.estimateLines);
    // Calculate construction check
    let checkSum = 0;
    state.estimateLines.forEach(element => {
      checkSum += Number(element.total);
    });
    state.constructionCheck = checkSum;
  },

  [type.SET_CONSTRUCTION_CHECK](state, payload) {
    state.constructionCheck = Number(payload.total);
  },

  [type.REMOVE_CONSTRUCTION_LINE](state, payload) {
    state.estimateLines = findByIdAndRemoveChildren(
      state.estimateLines,
      payload.id,
      state.allInsertedCodeIds
    );
  },

  [type.SET_SUB_PROJECT_ID](state, payload) {
    state.subProjectId = payload.id;
  },

  [type.SET_SUB_PROJECT_BUDGET](state, estimateFee) {
    state.projectBudget = Number(estimateFee);
  },

  [type.INITIATE_ESTIMATE_LINE](state, payload) {
    console.log(JSON.stringify(payload));
    state.estimateLines = [];
    state.allInsertedCodeIds = [];
    state.lineIdsByCodeNumber = [];
    
    for (let i = 0; i < payload.initialEstimateLines.length; i++) {
      const line = payload.initialEstimateLines[i];
      const cell = Object.assign({
        quantity: line.count,
        measurement: line.measurement,
        materialCostPer: line.materialCostPer,
        laborCostPer: line.laborCostPer,
        equipmentCostPer: line.equipmentCostPer,
        subcontractorCostPer: line.subcontractorCostPer,
        total: 0,
        newNumber: line.masterFormatCode.number,
        newTitle: line.masterFormatCode.title,
        newId: line.masterFormatCode.id,
        estimateLineId: line.id
      });
      state.lineIdsByCodeNumber[cell.newNumber] = cell.estimateLineId;
      // If the cell already exist, copy the value except children
      if (state.allInsertedCodeIds.includes(cell.newId)) {
        findAndUpdateExceptChildren(state.estimateLines, cell);
        continue;
      }
      addNewEstimateLine(state, cell);
    }
  }
};

function addNewEstimateLine(state, cell) {
  // Find parent hierarchy
  let childId = cell.newId;
  let cellHierarchy = Object.assign(cell, {
    children: [],
  });
  while (1) {
    let childCode = state.allCodes[childId - 1];
    state.allInsertedCodeIds.push(childId);
    if (childCode.parentId != null) {
      // If parentId is not null, continue searching parents.
      childId = childCode.parentId;
      /**
       * Check if the parent is already added in the estimate lines.
       * If yes, add new line under the parent
       * Unless, create parent and add new line
       * */

      if (state.allInsertedCodeIds.includes(childId)) {
        findAndPushChildren(
          state.estimateLines,
          childId,
          cellHierarchy
        );
        break;
      } else {
        cellHierarchy = Object.assign(new Object(), {
          quantity: 0,
          measurement: null,
          materialCostPer: 0,
          laborCostPer: 0,
          equipmentCostPer: 0,
          subcontractorCostPer: 0,
          total: 0,
          newNumber: state.allCodes[childId - 1].number,
          newTitle: state.allCodes[childId - 1].title,
          newId: state.allCodes[childId - 1].id,
          children: [cellHierarchy],
        });
      }
    } else {
      // If parentId is null, stop searching.
      state.estimateLines.push(cellHierarchy);
      break;
    }
  }
}

function findAndPushChildren(theObject, childId, cellHierarchy) {
  if (theObject instanceof Array) {
    for (let i = 0; i < theObject.length; i++) {
      findAndPushChildren(theObject[i], childId, cellHierarchy);
    }
  } else {
    if (theObject['newId'] == childId) {
      theObject['children'].push(cellHierarchy);
      return;
    } else {
      findAndPushChildren(theObject['children'], childId, cellHierarchy);
    }
  }
}

function findAndUpdateChildren(theObject, childId, cellHierarchy) {
  if (theObject instanceof Array) {
    for (let i = 0; i < theObject.length; i++) {
      findAndUpdateChildren(theObject[i], childId, cellHierarchy);
    }
  } else {
    if (theObject['newId'] == childId) {
      Object.assign(theObject, cellHierarchy);
      return;
    } else {
      findAndUpdateChildren(
        theObject['children'],
        childId,
        cellHierarchy
      );
    }
  }
}

function findAndUpdateExceptChildren(theObject, cell) {
  if (theObject instanceof Array) {
    for (let i = 0; i < theObject.length; i++) {
      findAndUpdateExceptChildren(theObject[i], cell);
    }
  } else {
    if (theObject['newId'] == cell.newId) {
      Object.assign(theObject, cell);
      return;
    } else {
      findAndUpdateExceptChildren(theObject['children'], cell);
    }
  }
}

function findByIdAndRemoveChildren(list, id, allIds) {
  return list
    .map(item => {
      return { ...item };
    })
    .filter(item => {
      if ('children' in item) {
        item.children = findByIdAndRemoveChildren(
          item.children,
          id,
          allIds
        );
      }
      // Remove the children ids from allInsertedCodeIds including mine
      if (item['newId'] == id) {
        removeChildrenIds(item, allIds);
      }
      return item['newId'] !== id;
    });
}

function removeChildrenIds(theObject, allIds) {
  if (theObject instanceof Array) {
    for (let i = 0; i < theObject.length; i++) {
      removeChildrenIds(theObject[i], allIds);
    }
  } else {
    // Remove child id from allIds
    const index = allIds.indexOf(theObject['newId']);
    if (index > -1) {
      allIds.splice(index, 1);
    }
    if ('children' in theObject) {
      if (theObject['children'].length == 0) {
        return;
      }
      removeChildrenIds(theObject['children'], allIds);
    }
  }
}

function reCalculateTotal(objArray) {
  let sumTotal = 0;
  for (let i = 0; i < objArray.length; i++) {
    let childTotal = reCalculateTotal(objArray[i].children);
    // Calculate mine total
    let mineTotal = (
      (Number(objArray[i].materialCostPer) +
        Number(objArray[i].laborCostPer) +
        Number(objArray[i].equipmentCostPer) +
        Number(objArray[i].subcontractorCostPer)) *
      Number(objArray[i].quantity)
    ).toFixed(2);
    objArray[i].total = childTotal + Number(mineTotal);
    sumTotal += objArray[i].total;
  }
  return sumTotal;
}
