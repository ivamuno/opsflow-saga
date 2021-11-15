<template>
  <div>
    <card>
      <div slot="header">
        <h4 class="card-title">Merchant Setup</h4>
        <p class="category">Data is shown in real time</p>
        <br />
      </div>
      <div class="table-responsive">
        <el-table class="table-bigboy"
                  style="width: 100%"
                  :data="tableData">
          <el-table-column min-width="100" label="Business Id">
            <template slot-scope="{row}">
              <p>{{row.businessId}}</p>
            </template>
          </el-table-column>
          <el-table-column min-width="100" label="Name">
            <template slot-scope="{row}">
              <p>{{row.name}}</p>
            </template>
          </el-table-column>
          <el-table-column min-width="100" label="Status">
            <template slot-scope="{row}">
              <p>{{row.status}}</p>
            </template>
          </el-table-column>
          <el-table-column min-width="300" label="Flow">   
            <template slot-scope="{row}">         
              <div class="card-body">
                <div class="rTable">
                  <div class="rTableBody">
                    <div class="rTableRow">
                      <div class="rTableCell">
                        <l-button wide outline round :type="row.init.command">Init</l-button>&nbsp;
                      </div>
                      <div class="rTableCell">
                        <div class="rTable">
                          <div class="rTableBody">
                            <div class="rTableRow">
                              <div class="rTableCell">
                                <l-button outline :type="row.cards.command">
                                  <span class="btn-label btn-label-right">
                                      <i class="fa fa-arrow-right"></i>
                                  </span>
                                  Cards
                                </l-button>
                              </div>
                              <div class="rTableCell">
                                <l-button outline :type="row.payon.command">
                                  <span class="btn-label btn-label-right">
                                      <i class="fa fa-arrow-right"></i>
                                  </span>
                                  PayOn
                                </l-button>
                              </div>
                              <div class="rTableCell">
                                <l-button outline :type="row.acehub.command">
                                  <span class="btn-label btn-label-right">
                                      <i class="fa fa-arrow-right"></i>
                                  </span>
                                  AceHub
                                </l-button>
                              </div>
                            </div>
                            <div class="rTableRow">
                              <div class="rTableCell">
                                <l-button round size="sm" outline :type="row.cards.compensation">
                                  cancel
                                  <span class="btn-label">
                                      <i class="fa fa-arrow-left"></i>
                                  </span>
                                </l-button>
                              </div>
                              <div class="rTableCell">
                                <l-button round size="sm" outline :type="row.payon.compensation">
                                  cancel
                                  <span class="btn-label">
                                      <i class="fa fa-arrow-left"></i>
                                  </span>
                                </l-button>
                              </div>
                              <div class="rTableCell">
                                <l-button round size="sm" outline :type="row.acehub.compensation">
                                  cancel
                                  <span class="btn-label">
                                      <i class="fa fa-arrow-left"></i>
                                  </span>
                                </l-button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="rTableCell">
                        <l-button wide outline round :type="row.finish.command">
                          End
                        </l-button>
                      </div>
                    </div>
                  </div>
                </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </card>
  </div>
</template>
<script>
  import {Table, TableColumn} from 'element-ui'
  import LButton from '../../../components/Button'
  import io from "socket.io-client";

  export default{
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      LButton
    },
    data () {
      return {
        tableData: []
      }
    },
    mounted () {
      let socket = io.connect('http://localhost:9045');

      socket.on('aceHubSetups', (message) => {
        this.receivedMessage(message);
      });
      socket.on('aceHubSetupUpdate', (message) => {
        this.receivedMessage(message);
      });
    },
    methods: {
      receivedMessage(message) {
        console.log('receivedMessage', message);

        JSON.parse(message).forEach(m => {
          console.log('message', m);
          const index = this.tableData.findIndex(i => i.businessId == m.businessId);
          if (index == -1){
            this.tableData.push(m);
            return;
          }

          // this.tableData.splice(index, 0);
          this.tableData.splice(index, 1, m);
        });
      }
    }
  }
</script>
<style>
  .rTable { display: table; }
  .rTableRow { display: table-row; }
  .rTableHeading { display: table-header-group; }
  .rTableBody { display: table-row-group; }
  .rTableFoot { display: table-footer-group; }
  .rTableCell { display: table-cell; margin: auto; text-align: center; padding: 0px 2px; }
</style>
