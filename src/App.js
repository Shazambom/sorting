import React, { Component } from 'react';
import './App.css';

const NUM_BARS = 42;
const NUM_ARR = 30;

const Rainbow = require('rainbowvis.js');
const rainbow = new Rainbow();
rainbow.setSpectrum('blue', 'green', 'yellow');
rainbow.setNumberRange(0, NUM_BARS);

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: this.genVals(NUM_ARR, NUM_BARS)
        };
    }

    render() {
          let width = 20.25;
          let grid = [];
          for (let i = 0; i < NUM_ARR; i++) {
              let currArr = this.state.arr[i];
              grid.push(<div className="row">
                  {currArr.map((height) => {
                      let color = rainbow.colourAt(height);
                      return <div className="column"
                                  style={{height: width, width: width, backgroundColor: `#${color}`}}></div>;
                  })}
              </div>);
          }

        return (
              <div className="App">
                <header className="App-header">
                    <div className="row">
                        <button className="button" onClick={() => this.sort_all_merge(this.state.arr.slice())}>MergeSort</button>
                        <button className="button" onClick={() => this.sort_all_quick(this.state.arr.slice())}>QuickSort</button>
                        <button className="button" onClick={() => this.sort_all_comb(this.state.arr.slice())}>CombSort</button>
                        <button className="button" onClick={() => this.sort_all_bubble(this.state.arr.slice())}>BubbleSort</button>
                        <button className="button" onClick={() => this.sort_all_insert(this.state.arr.slice())}>InsertionSort</button>
                        <button className="button" onClick={() => this.setState({arr: this.genVals(NUM_ARR, NUM_BARS)})}>Scramble</button>
                    </div>
                    {grid}
                </header>
              </div>
            );
    }

    sort_all_bubble(arr) {
        arr.map(async (row, ind) => {
            this.bubble_sort(row, ind);
        });
    }

    async bubble_sort (arr, ind) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j + 1 < arr.length - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    await this.swap(arr, j, j + 1, ind);
                }
            }
        }
        return arr;
    }

    sort_all_comb(arr) {
        arr.map(async (row, ind) => {
            this.comb_sort(row, ind);
        });
    }

    async comb_sort(arr, ind) {
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
                    await this.swap(arr, i, i + gap, ind);
                    sorted = false;
                }
            }
        }
    }

    sort_all_insert(arr) {
        arr.map(async (row, ind) => {
            this.insertion_sort(row, ind);
        });
    }

    async insertion_sort(arr, ind) {
        for (let i = 0; i < arr.length; i++) {
            let x = arr[i];
            let j = i- 1;
            while (j >= 0 && arr[j] > x) {
                arr[j + 1] = arr[j];
                j -= 1;
                await this.setArrSlow(arr, ind);
            }
            arr[j + 1] = x;
            await this.setArrSlow(arr, ind);
        }
    }

    sort_all_merge(arr) {
        arr.map(async (row, ind) => {
            this.merge_sort(row, 0, row.length, ind);
        });
    }

    async merge_sort (arr, left, right, ind)  {
        if (right - 1 <= left) {
            return;
        }
        let center = Math.floor((right + left) / 2);
        await this.merge_sort(arr, left, center, ind);
        let leftArr = arr.slice(left, center);
        await this.merge_sort(arr, center, right, ind);
        let rightArr = arr.slice(center, right);
        let merged = this.merge(leftArr, rightArr);
        for (let i = left; i < right; i++) {
            arr[i] = merged[i - left];
            await this.setArrSlow(arr, ind);
        }
    };

    merge(left, right) {
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

    sort_all_quick(arr) {
        arr.map(async (row, ind) => {
            this.quick_sort(row, 0, row.length, ind);
        });
    }


    async quick_sort(arr, left, right, ind) {
        if (left < right) {
            let p = await this.partition(arr, left, right, ind);
            await this.quick_sort(arr, left, p, ind);
            await this.quick_sort(arr, p + 1, right, ind);
        }
    };

    async partition(arr, left, right, ind) {
        let pivot = arr[right - 1];
        let i = left;
        for (let j = left; j < right - 1; j++) {
            if (arr[j] < pivot) {
                await this.swap(arr, i, j, ind);
                i += 1;
            }
        }
        await this.swap(arr, i, right - 1, ind);
        return i;
    };







    genVals(numArr, numDivs) {
        let toReturn = [];
        for (let i = 0; i < numArr; i++) {
            let arr = [];
            while (arr.length < numDivs) {
                let r = Math.floor(Math.random() * numDivs) + 1;
                if (arr.indexOf(r) === -1) arr.push(r);
            }
            toReturn.push(arr);
        }
        return toReturn;
    };
    async swap(arr, a, b, ind) {
        let temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
        await this.setArrSlow(arr, ind);
    }
    async setArrSlow(arr, ind) {
        let temp = this.state.arr.slice();
        temp[ind] = arr;
        this.setState({arr: temp});
        await new Promise(resolve => setTimeout(resolve, 0));
    }
}

export default App;
