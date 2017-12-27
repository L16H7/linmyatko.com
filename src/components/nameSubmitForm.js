import React, { Component } from "react";
import fire from '../fire';
import { firebase } from "@firebase/app";


class NameSubmitForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      gender: 'male',
      error: '',
      loading: false 
    };

  }

  renderButton() {
    if (this.state.loading) {
      return (
        <button disabled className="ft-btn ft-green" style={{ backgroundColor: 'grey'}}>
          <div className="ft-btn-text">
            <span className="ft-btn-text-primary">ပေးပို့နေပါသည် ...</span>
          </div>
        </button>
      );
    }

    return (
      <button onClick={this.submitName.bind(this)} className="ft-btn ft-green">
        <div className="ft-btn-text">
          <span className="ft-btn-text-primary">ထည့်သွင်းမည်</span>
        </div>
      </button>
    );
  }

  submitName() {
    if (this.state.name === '') {
      this.setErrorMessage('နာမည် ဖြည့်ပါ။');
      return;
    }
    this.setState({ loading: true });
    var self = this;
    var gender = this.state.gender;

    if (gender === 'male') {
      var ref = firebase.database().ref(`male_master`);
    }
    else {
      var ref = firebase.database().ref(`female_master`);
    }

    var searchName = this.state.name.trim().toLowerCase();

    ref.orderByChild('name').equalTo(searchName).on("value", function (snapshot) {
      console.log(snapshot.val());
      if (snapshot.val() === null) {
        var ref_update = (gender === 'male') ?
          firebase.database().ref(`male_update`) : firebase.database().ref(`female_update`);

        ref_update.orderByChild('name').equalTo(searchName).once("value", function (snapshot) {
          console.log(snapshot.val());
          if (snapshot.val() === null) {
            self.pushNameToFirebase(searchName, gender);
          }
          else {
            self.setErrorMessage("ရှိနေပြီးသား ဖြစ်နေပါတယ်။");
          }
        });
      }
      else {
        self.setErrorMessage("ရှိနေပြီးသား ဖြစ်နေပါတယ်။");
      }
    });
  }

  pushNameToFirebase = (name_update, gender) => {
    var self = this;

    var ref = (gender === 'male') ?
      firebase.database().ref(`male_update`) : firebase.database().ref(`female_update`);
    
    ref.push({ name: name_update })
      .then(() => {
        self.setSuccessMessage("ေကျးဇူးတင်ပါတယ်။");
        self.setErrorMessage('');
      });
    
  }

  setErrorMessage = (error) => {
    this.setState({ error });
    this.setState({ loading: false });
  }

  setSuccessMessage = (success) => {
    this.setState({ success });
    this.setState({ loading: false })
  }

  clearMessages = () => {
    this.setState({ error: '', success: '' });
  }
  
  onInputChange(name) {
    this.setState({ name });
  }

  onRadioChange(event) {
    this.setState({ gender: event.target.value });
  }

  render() {
    return (
      <div className="nice-padding">
        <div className="ft-form-item">
          <div>
            အမည်ဖြည့်ရန်
          </div>
          <input
            type="text"
            id="name"
            name="name"
            minLength="2"
            value={this.props.name}
            onChange={event => this.onInputChange(event.target.value)}
            onFocus={() => this.clearMessages()}
          />
        </div>
        <div onChange={this.onRadioChange.bind(this)}>
          <label className="ft-radio">
            <input type="radio" id="1" name="radiotype"
              defaultChecked
              value="male" />
            <div className="check" />အမျိုးသား
          </label>
          <label className="ft-radio">
            <input type="radio" id="2" name="radiotype"
              value="female" />
            <div className="check" />အမျိုးသမီး
          </label>
        </div>
        <div>
          {this.renderButton()}
        </div>
        <div>
          <label id="name-error" className="error">
            {this.state.error}
          </label>
          <label className="success">
            {this.state.success}
          </label>
        </div>

      </div>
    );
  }
}

export default NameSubmitForm;
