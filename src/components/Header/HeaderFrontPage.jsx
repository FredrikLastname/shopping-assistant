import React from "react"
import Grid from '@material-ui/core/Grid';

const HeaderFronPage = ()=>{
    return(
        <header className="header header-empty">
              <Grid container spacing={3}>
              <Grid item xs={12}>
                  <div className="header-frontpage-title">
                    Fredriks lilla shoppingassistent
                  </div>
              </Grid>
              </Grid>
        </header>
    )
}

export default HeaderFronPage