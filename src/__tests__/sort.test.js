

test('tests the sorting method', () => {
    let array = [9, 1, 4, 8, 2, 0, 3, 7, 6, 5];
    let arr = merge_sort(array, 0, array.length);
    expect(arr).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('test kindof inplace', () => {
    let array = [9, 1, 4, 8, 2, 0, 3, 7, 6, 5];
    merge_sortIP(array, 0, array.length);
    expect(array).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('tests merging', () => {
    let left = [1, 2, 6];
    let right = [3, 4, 8];
    expect(merge(left, right)).toEqual([1, 2, 3, 4, 6, 8]);
});

test('tests the quick_sort method', () => {
    let array = [9, 1, 4, 8, 2, 0, 3, 7, 6, 5];
    quick_sort(array, 0, array.length);
    expect(array).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
test('tests the comb_sort method', () => {
    let array = [9, 1, 4, 8, 2, 0, 3, 7, 6, 5];
    comb_sort(array);
    expect(array).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});


const comb_sort = (arr) => {
    let gap = arr.length;
    let shrink = 1.3;
    let sorted = false;
    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap <= 1){
            gap = 1;
            sorted = true;
        }
        for (let i = 0; i + gap < arr.length; i++) {
            if (arr[i] > arr[i + gap]) {
                let temp = arr[i];
                arr[i] = arr[i + gap];
                arr[i + gap] = temp;
                sorted = false;
            }
        }
    }
};


const quick_sort = (arr, left, right) => {
    if (left < right) {
        let p = partition(arr, left, right);
        quick_sort(arr, left, p);
        quick_sort(arr, p + 1, right);
    }
};

const partition = (arr, left, right) => {
    let pivot = arr[right - 1];
    let i = left;
    for (let j = left; j < right - 1; j++) {
        if (arr[j] < pivot) {
            let temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
            i += 1;
        }
    }
    let temp = arr[i];
    arr[i] = pivot;
    arr[right - 1] = temp;
    return i;
};

const merge_sortIP = (arr, left, right) => {
    if (right - 1 <= left) {
        return;
    }
    let center = Math.floor((right + left) / 2);
    merge_sortIP(arr, left, center);
    let leftArr = arr.slice(left, center);
    merge_sortIP(arr, center, right);
    let rightArr = arr.slice(center, right);
    let merged = merge(leftArr, rightArr);
    for (let i = left; i < right; i++) {
        arr[i] = merged[i - left];
    }
};

const merge_sort = (arr) =>  {
    if (arr.length <= 1) {
        return arr;
    }
    let center = Math.floor(arr.length / 2);
    let leftArr = merge_sort(arr.slice(0, center));
    let rightArr = merge_sort(arr.slice(center));

    return merge(leftArr, rightArr);
};

const merge = (left, right) => {
    let arr = [];
    while (left.length !== 0 || right.length !== 0) {
        if (left.length === 0) {
            arr.push(...right);
            break;
        } else if (right.length === 0) {
            arr.push(...left);
            break;
        }
        arr.push(left[0] > right[0] ? right.shift() : left.shift());
    }
    return arr;
};