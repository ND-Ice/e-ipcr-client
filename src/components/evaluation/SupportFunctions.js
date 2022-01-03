import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { CustomModal } from "..";
import {
  AddSupportFunctions,
  AddSupportTargetMeasure,
  EditSupportSuccessIndicator,
} from ".";
import {
  deleteSupportFunction,
  deleteSupportSuccessIndicator,
  getCreateEvaluation,
  setCurrentId,
  setTargetIndicator,
} from "../../store/createEvaluation";

export default function SupportFunctions() {
  const evaluations = useSelector(getCreateEvaluation);
  const dispatch = useDispatch();
  const { supportFunctions } = evaluations;

  const [showEditSuccessIndicator, setShowEditSuccessIndicator] =
    useState(false);
  const [showAddSupportFunctions, setShowAddSupportFunctions] = useState(false);
  const [showAddSupportTargetMeasure, setShowAddSupportTargetMeasure] =
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
            <td className="p-4" colSpan={3}>
              <TableHeader>Actual Accomplishments</TableHeader>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4" colSpan={3}>
              <TableHeader>Support Functions - 10%</TableHeader>
            </td>
            <td className="p-4" colSpan={2}>
              <Button onClick={() => setShowAddSupportFunctions(true)}>
                Add Support Function
              </Button>
            </td>
          </tr>
          {supportFunctions?.map((suppFunc) => (
            <React.Fragment key={suppFunc?.id}>
              <tr key={suppFunc?.id}>
                <td className="p-4">
                  <h6 className="m-0">
                    {suppFunc?.title} ({suppFunc?.percentage}%)
                  </h6>
                  {suppFunc?.description && (
                    <Description className="mt-2">
                      {suppFunc?.description}
                    </Description>
                  )}
                </td>
                <td className="p-4" colSpan={3}>
                  <Button
                    onClick={() => {
                      dispatch(setCurrentId(suppFunc?.id));
                      return setShowAddSupportTargetMeasure(true);
                    }}
                  >
                    Add Success Indicator
                  </Button>
                </td>
                <td className="p-4">
                  <Button
                    variant="danger"
                    onClick={() =>
                      dispatch(
                        deleteSupportFunction({
                          id: suppFunc?.id,
                          supportFunctionsMeasure: parseInt(
                            suppFunc?.percentage
                          ),
                        })
                      )
                    }
                  >
                    Delete Function
                  </Button>
                </td>
              </tr>
              {suppFunc?.successIndicators?.map((successIndicator) => (
                <tr key={successIndicator?.id}>
                  <td className="p-4"></td>
                  <td className="p-4">
                    <Description>{successIndicator?.title}</Description>
                  </td>
                  <td className="p-4">
                    {successIndicator?.actualAccomplishments?.title}
                  </td>
                  <td className="p-4">
                    <Button
                      onClick={() => {
                        dispatch(
                          setTargetIndicator({
                            funcId: suppFunc?.id,
                            indicatorId: successIndicator?.id,
                          })
                        );
                        return setShowEditSuccessIndicator(true);
                      }}
                    >
                      Edit Success Indicator
                    </Button>
                  </td>
                  <td className="p-4">
                    <Button
                      variant="danger"
                      onClick={() =>
                        dispatch(
                          deleteSupportSuccessIndicator({
                            funcId: suppFunc?.id,
                            indicatorId: successIndicator?.id,
                          })
                        )
                      }
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td className="bg-secondary" colSpan={5}></td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
      {/* modal */}
      <CustomModal
        heading="Support Functions"
        show={showAddSupportFunctions}
        onHide={() => setShowAddSupportFunctions(false)}
      >
        <AddSupportFunctions open={setShowAddSupportFunctions} />
      </CustomModal>
      {/* add support target measure */}
      <CustomModal
        heading="Add Succcess Indicator (Target Measure)"
        show={showAddSupportTargetMeasure}
        onHide={() => setShowAddSupportTargetMeasure(false)}
      >
        <AddSupportTargetMeasure open={setShowAddSupportTargetMeasure} />
      </CustomModal>
      {/* edit success indicator */}
      <CustomModal
        heading="Edit Success Indicator"
        show={showEditSuccessIndicator}
        onHide={() => setShowEditSuccessIndicator(false)}
      >
        <EditSupportSuccessIndicator open={setShowEditSuccessIndicator} />
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

const Description = styled.p`
  max-width: 35ch;
  margin: 0;
`;
