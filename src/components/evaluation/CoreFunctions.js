import React, { useState } from "react";
import styled from "styled-components";
import { Button, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import { CustomModal } from "..";
import { AddCoreFunctions, AddTargetMeasure, EditSuccessIndicator } from ".";
import {
  deleteCoreFunction,
  deleteCoreSucessIndicator,
  getCreateEvaluation,
  setCurrentId,
  setTargetIndicator,
} from "../../store/createEvaluation";

export default function CoreFunctions() {
  const evaluation = useSelector(getCreateEvaluation);
  const dispatch = useDispatch();
  const [showAddCoreFunctions, setShowAddCoreFunctions] = useState(false);
  const [showAddTargetMeasure, setShowAddTargetMeasure] = useState(false);
  const [showEditSuccessIndicator, setShowEditSuccessIndicator] =
    useState(false);

  return (
    <Container>
      <Table bordered>
        <thead>
          <tr>
            <td className="p-4">
              <TableHeader>Statement of Functions</TableHeader>
            </td>
            <td className="p-4">
              <TableHeader>Success Indicators (Target Measure)</TableHeader>
            </td>
            <td className="p-4">
              <TableHeader>Actual Accomplishment</TableHeader>
            </td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4">
              <TableHeader>
                <TableIndicator>Core Functions - 90%</TableIndicator>
              </TableHeader>
            </td>
            <td></td>
            <td></td>
            <td>
              <Button onClick={() => setShowAddCoreFunctions(true)}>
                Add Core Function
              </Button>
            </td>
            <td></td>
          </tr>
          {evaluation?.coreFunctions?.map((func) => (
            <React.Fragment key={func?.id}>
              <tr>
                <TableData className="px-4 p-3">
                  <h6 className="m-0">
                    <Description>
                      {func?.title} ({func.percentage}%)
                    </Description>
                  </h6>
                  {func?.description && (
                    <Description>{func?.description}</Description>
                  )}
                </TableData>
                <td>
                  <Button
                    onClick={() => {
                      dispatch(setCurrentId(func.id));
                      setShowAddTargetMeasure(true);
                    }}
                  >
                    Add Success Indicator
                  </Button>
                </td>
                <td></td>
                <td></td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() =>
                      dispatch(
                        deleteCoreFunction({
                          id: func.id,
                          coreFunctionsMeasure: parseInt(func.percentage),
                        })
                      )
                    }
                  >
                    Delete Function
                  </Button>
                </td>
              </tr>
              {func?.successIndicators?.map((successIndicator) => (
                <tr key={successIndicator?.id}>
                  <td></td>
                  <td className="p-4">
                    <Description>{successIndicator?.title} </Description>
                  </td>
                  <td className="p-4">
                    <Description>
                      {successIndicator?.actualAccomplishments?.title}
                    </Description>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        dispatch(
                          setTargetIndicator({
                            funcId: func?.id,
                            indicatorId: successIndicator?.id,
                          })
                        );
                        return setShowEditSuccessIndicator(true);
                      }}
                    >
                      Edit Success Indicator
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() =>
                        dispatch(
                          deleteCoreSucessIndicator({
                            funcId: func?.id,
                            indicatorId: successIndicator.id,
                          })
                        )
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <CustomModal
        heading="Core Function"
        show={showAddCoreFunctions}
        onHide={() => setShowAddCoreFunctions(false)}
      >
        <AddCoreFunctions open={setShowAddCoreFunctions} />
      </CustomModal>
      <CustomModal
        heading="Add Success Indicator (Target Measure)"
        show={showAddTargetMeasure}
        onHide={() => setShowAddTargetMeasure(false)}
      >
        <AddTargetMeasure open={setShowAddTargetMeasure} />
      </CustomModal>
      <CustomModal
        heading="Edit Success Indicator"
        show={showEditSuccessIndicator}
        onHide={() => setShowEditSuccessIndicator(false)}
      >
        <EditSuccessIndicator open={setShowEditSuccessIndicator} />
      </CustomModal>
    </Container>
  );
}

const Container = styled.div``;

const TableHeader = styled.h5`
  margin: 0;
  font-weight: 500;
  font-size: 1.2rem;
  text-transform: capitalize;
`;

const TableData = styled.td`
  cursor: pointer;
  text-transform: capitalize;
`;

const TableIndicator = styled.div`
  display: flex;
  align-items: center;
  text-transform: capitalize;
`;

const Description = styled.p`
  margin-top: 1rem;
  max-width: 35ch;
`;
