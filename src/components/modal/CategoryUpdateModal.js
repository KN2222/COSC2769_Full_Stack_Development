import React, { useEffect, useReducer, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCreateSubCategory } from '../../api/createSubCategory';
import { useUpdateCategory } from '../../api/updateCategory';
import { useToastContext } from '../../store/toastContext';
import { CategoryUpdateForm } from '../form/CategoryUpdateForm';
import { useRef } from 'react';

const attributeTypeReducer = (state, action) => {
  if (action.type === 'number') {
    return { ...state, type: 'number' };
  } else if (action.type === 'string') {
    return { ...state, type: 'string' };
  }
  throw Error('Invalid action type');
};

function isExtraAttributeValid(attributeName) {
  if (
    attributeName !== 'name' &&
    attributeName !== '_id' &&
    attributeName !== 'admins' &&
    attributeName !== 'subCategories' &&
    attributeName !== 'subCategoryNames' &&
    attributeName !== '__v' &&
    attributeName !== 'title' &&
    attributeName !== 'description' &&
    attributeName !== 'seller' &&
    attributeName !== 'date' &&
    attributeName !== 'categories'
  ) {
    return true;
  } else {
    return false;
  }
}

export const CategoryUpdateModal = (props) => {
  const { createSubCategory, isSuccess: isUpdateSubSuccess } =
    useCreateSubCategory();
  const { updateCategory, isSuccess: isUpdateSuccess } = useUpdateCategory();
  const { category } = props;
  const [categoryName, setCategoryName] = useState(category.name);
  const [subCategoriesNames, setSubCategoriesName] = useState(
    category.subCategoryNames
  );
  const [subCategories, setSubCategories] = useState(category.subCategories);
  const [isAddNewSubCategory, setIsAddNewSubCategory] = useState(false);
  const [isAddNewAttribute, setIsAddNewAttribute] = useState(false);
  const [newSubCategories, setNewSubCategories] = useState([]);
  const [newAttributes, setNewAttributes] = useState([]);
  const [validated, setValidated] = useState(true);
  const [extraValues, setExtraValues] = useState({});
  const [attributeType, dispatchAttributeType] = useReducer(
    attributeTypeReducer,
    { type: 'none' }
  );
  const { showToast } = useToastContext();
  const form = useRef(null);

  useEffect(() => {
    if (isUpdateSuccess || isUpdateSubSuccess) {
      showToast(200, 'Category updated successfully');
    }
  }, [isUpdateSuccess, isUpdateSubSuccess, showToast]);

  useEffect(() => {
    if (newSubCategories.length > 0) {
      setSubCategoriesName((prevState) => [
        ...prevState,
        newSubCategories[newSubCategories.length - 1],
      ]);
    }
  }, [newSubCategories]);

  useEffect(() => {
    if (!props.show) {
      setSubCategoriesName(category.subCategoryNames);
      setSubCategories(category.subCategories);
      setNewSubCategories([]);
      setNewAttributes([]);
      setExtraValues({});
      setIsAddNewSubCategory(false);
      setIsAddNewAttribute(false);
    }
  }, [props.show, category.subCategoryNames, category.subCategories]);

  const handleDeleteSubCategory = (subCategoryId, index) => {
    const updatedSubCategories = subCategories.filter(
      (subCategory) => subCategory !== subCategoryId
    );
    setSubCategories(updatedSubCategories);
    const updatedSubCategoryNames = subCategoriesNames.filter(
      (subCategoryName, subCategoryIndex) => subCategoryIndex !== index
    );
    setSubCategoriesName(updatedSubCategoryNames);
  };

  const handleAddNewSubCategory = () => {
    setIsAddNewSubCategory(true);
  };

  const handleAddNewAttribute = () => {
    setIsAddNewAttribute(true);
  };

  const handleNewSubCategoryEnter = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value && e.target.value.length > 0) {
        setNewSubCategories((prevState) => [...prevState, e.target.value]);
      }
      setIsAddNewSubCategory(false);
    }
  };

  const handleNewAttributeEnter = (e) => {
    if (e.key === 'Enter') {
      if (
        e.target.value &&
        isExtraAttributeValid(e.target.value) &&
        e.target.value.length > 0 &&
        attributeType.type !== 'none'
      ) {
        setNewAttributes((prevState) => [
          ...prevState,
          {
            name: e.target.value,
            type: attributeType.type,
          },
        ]);

        setExtraValues((prevState) => ({
          ...prevState,
          [e.target.value]: attributeType.type === 'number' ? 0 : '',
        }));
      } else {
        showToast(400, 'Invalid attribute name');
      }
    }
  };

  const getExtraValues = () => {
    if (Object.keys(extraValues).length === 0) {
      const defaultExtraValues = extraAttributes.reduce((acc, attribute) => {
        return { ...acc, [attribute]: category[attribute] };
      }, {});
      return defaultExtraValues;
    } else {
      const defaultExtraValues = extraAttributes.reduce((acc, attribute) => {
        return { ...acc, [attribute]: category[attribute] };
      }, {});

      return { ...defaultExtraValues, ...extraValues };
    }
  };

  const handleUpdateCategory = async (e) => {
    const extra = getExtraValues();
    console.log(extra);

    if (form.current.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      if (subCategoriesNames.length > 0) {
        subCategoriesNames.forEach(async (subCategoryName) => {
          await createSubCategory({
            name: subCategoryName,
            updateFields: {
              ...getExtraValues(),
            },
            parentId: category._id,
          });
        });
      }

      await updateCategory(category._id, {
        name: categoryName,
        ...getExtraValues(),
        subCategories: subCategoriesNames,
      });

      setNewSubCategories([]);
      setNewAttributes([]);
      setExtraValues({});
      props.onHide();
    }
  };

  const extraAttributes = Object.keys(category).filter(
    (key) =>
      key !== 'name' &&
      key !== 'admins' &&
      key !== 'subCategories' &&
      key !== 'subCategoryNames' &&
      key !== 'adminId' &&
      key !== '_id' &&
      key !== '__v' &&
      key !== 'parentId'
  );

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      className='w-100'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          {`${category.name.toUpperCase()} INFORMATION`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CategoryUpdateForm
          category={category}
          subCategoriesNames={subCategoriesNames}
          handleDeleteSubCategory={handleDeleteSubCategory}
          handleAddNewSubCategory={handleAddNewSubCategory}
          isAddNewSubCategory={isAddNewSubCategory}
          handleNewSubCategoryEnter={handleNewSubCategoryEnter}
          handleAddNewAttribute={handleAddNewAttribute}
          isAddNewAttribute={isAddNewAttribute}
          dispatchAttributeType={dispatchAttributeType}
          handleNewAttributeEnter={handleNewAttributeEnter}
          extraAttributes={extraAttributes}
          newAttributes={newAttributes}
          setCategoryName={setCategoryName}
          setExtraValues={setExtraValues}
          attributeType={attributeType}
          validated={validated}
          handleUpdateCategory={handleUpdateCategory}
          ref={form}
        />
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between'>
        <Button
          type='submit'
          variant='primary'
          onClick={handleUpdateCategory}
        >
          Save
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
