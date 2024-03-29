import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../Store";

export enum SortPropsEnum {
    RATING_DESC = 'rating', 
    RATING_ASC ='-rating', 
    TITLE_DESC ='title', 
    TITLE_ASC ='-title', 
    PRICE_DESC = 'price',
    PRICE_ASC = '-price' ,
}

export type  Sort = {
    name: string,
    sortProps: SortPropsEnum;
}

export interface FilterSliceState {
    searchValue: string,
    categoryId: number,
    currentPage: number,
    sort: Sort,
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'Popular',
        sortProps: SortPropsEnum.RATING_DESC
    }
}

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.categoryId = Number(action.payload.categoryId);
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'Popular',
                    sortProps: SortPropsEnum.RATING_DESC
                }
            }
        },
    }
})

export const selectSort = (state: RootState) => state.filter.sort
export const selectFilter = (state: RootState) => state.filter

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;