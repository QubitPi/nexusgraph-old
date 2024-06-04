// Copyright 2024 Jiaqi Liu. All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { PlusIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { StyledGraphListItem } from "../styled";
import { MethodModal } from "./MethodModal";
import { Method } from "./methods";
import { MethodsSelectionModal } from "./MethodsSelectionModal";

/**
 * {@link NewGraphButton} controls 2 modals:
 *
 * 1. {@link | NewGraphMethodModal the model that displays available options to generate a new graph}
 * 2. {@link | MethodModal the modal corresponding to one of the options}
 *
 * Only one of the two modals pops up at a specific time and {@link NewGraphButton} controls which one to display using
 * `showMethodsSelectionModal` and `showMethodModal` React states
 *
 * @param props  The regular React props for {@link NewGraphButton}
 *
 * @returns a DOM object
 */
export default function NewGraphButton(): JSX.Element {
  const [showMethodsSelectionModal, setShowMethodsSelectionModal] = useState<boolean>(false);
  const [showMethodModal, setShowMethodModal] = useState<boolean>(false);
  const [newGraphMethod, setNewGraphMethod] = useState<Method | null>(null);

  useEffect(() => {
    if (newGraphMethod) {
      setShowMethodModal(true);
    }
  }, [newGraphMethod]);

  useEffect(() => {
    if (!showMethodModal && !showMethodsSelectionModal) {
      setNewGraphMethod(null);
    }
  }, [showMethodModal]);

  return (
    <>
      <StyledGraphListItem id="newGraphButton" onClick={() => setShowMethodsSelectionModal(true)} displayedItem={false}>
        <PlusIcon />
      </StyledGraphListItem>

      <MethodsSelectionModal
        showModal={showMethodsSelectionModal}
        setShowModal={setShowMethodsSelectionModal}
        setNewGraphMethod={setNewGraphMethod}
      />

      {newGraphMethod && (
        <MethodModal showModal={showMethodModal} setShowModal={setShowMethodModal} newGraphMethod={newGraphMethod} />
      )}
    </>
  );
}
