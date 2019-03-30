import React, { Component } from 'react';
import './App.css';
const NUM_BARS = 150;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arr: this.genVals(NUM_BARS)
        };
    }

    render() {
      let width = 10;
    return (
          <div className="App">
            <header className="App-header">
                <div className="row">
                    <button className="button" onClick={() => this.merge_sort(this.state.arr.slice(), 0, this.state.arr.length)}>MergeSort</button>
                    <button className="button" onClick={() => this.quick_sort(this.state.arr.slice(), 0, this.state.arr.length)}>QuickSort</button>
                    <button className="button" onClick={() => this.comb_sort(this.state.arr.slice())}>CombSort</button>
                    <button className="button" onClick={() => this.bubble_sort(this.state.arr.slice())}>BubbleSort</button>
                    <button className="button" onClick={() => this.insertion_sort(this.state.arr.slice())}>InsertionSort</button>
                    <button className="button" onClick={() => this.setState({arr: this.genVals(NUM_BARS)})}>Scramble</button>
                </div>
              <div className="row">
                {this.state.arr.map((height) => {
                  return <div className="column" style={{height: height * 5, width: width}}></div>
                })}
              </div>
            </header>
          </div>
        );
    }

    async bubble_sort (arr) {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j + 1 < arr.length - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j + 1];
                    arr[j + 1] = arr[j];
                    arr[j] = temp;
                    await this.setArrSlow(arr, 0.5)
                }
            }
        }
        return arr;
    }

    async comb_sort(arr) {
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
                    await this.setArrSlow(arr, 10);
                    sorted = false;
                }
            }
        }
    }

    async insertion_sort(arr) {
        for (let i = 0; i < arr.length; i++) {
            let x = arr[i];
            let j = i- 1;
            while (j >= 0 && arr[j] > x) {
                arr[j + 1] = arr[j];
                j -= 1;
                await this.setArrSlow(arr, 0.5);
            }
            arr[j + 1] = x;
            await this.setArrSlow(arr, 0.5);
        }
    }

    async merge_sort (arr, left, right)  {
        if (right - 1 <= left) {
            return;
        }
        let center = Math.floor((right + left) / 2);
        await this.merge_sort(arr, left, center);
        let leftArr = arr.slice(left, center);
        await this.merge_sort(arr, center, right);
        let rightArr = arr.slice(center, right);
        let merged = this.merge(leftArr, rightArr);
        for (let i = left; i < right; i++) {
            arr[i] = merged[i - left];
            await this.setArrSlow(arr, 10);
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


    async quick_sort(arr, left, right) {
        if (left < right) {
            let p = await this.partition(arr, left, right);
            await this.quick_sort(arr, left, p);
            await this.quick_sort(arr, p + 1, right);
        }
    };

    async partition(arr, left, right) {
        let pivot = arr[right - 1];
        let i = left;
        for (let j = left; j < right - 1; j++) {
            if (arr[j] < pivot) {
                let temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
                i += 1;
                await this.setArrSlow(arr, 10);
            }
        }
        let temp = arr[i];
        arr[i] = pivot;
        arr[right - 1] = temp;
        await this.setArrSlow(arr, 10);
        return i;
    };







    genVals(numDivs) {
        let arr = [];
        while(arr.length <  numDivs){
            let r = Math.floor(Math.random()*numDivs) + 1;
            if(arr.indexOf(r) === -1) arr.push(r);
        }
        return arr;
    };
    async setArrSlow(arr, time) {
        this.setState({arr: arr});
        await new Promise(resolve => setTimeout(resolve, time));
    }
}

export default App;
