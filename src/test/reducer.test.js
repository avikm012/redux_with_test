import reducer from '../reducer';


describe("Region Reducer",()=>{

    it('should return default state',()=>{
        const newState = reducer(undefined,{});
        expect(newState).toEqual({"error": null, "regions": []});
    })

    it('should return new state if receiving type',()=>{
        const post =[
            {title:'Element 1'},{title:'Element 2'},{title:'Element 3'}
        ]
        const newState = reducer(undefined,{
            type:"FETCH_REGIONS",
            payload:post
        });
        const expectedState={
            regions: [
              { title: 'Element 1' },
              { title: 'Element 2' },
              { title: 'Element 3' }
            ],
            error: null
          }
        // console.log( newState);
        expect(newState).toEqual(expectedState);
    })

    it('should return new state if receiving type',()=>{
        const post ='Error not found'
        const newState = reducer(undefined,{
            type:"ERROR",
            payload:post
        });
        
        // console.log( newState);
        const expectedState={"error": "Error not found", "regions": []}
        expect(newState).toEqual(expectedState);
    })
})